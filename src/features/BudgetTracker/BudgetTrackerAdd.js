import {useEffect, useRef, useState} from "react";
import "./BudgetTracker.scss"
import {Col, DatePicker, Divider, message, Radio, Row} from "antd";
import ButtonCustom from "../../components/Button/Button"
import Input from "../../components/Input/Input";
import {useAddBudgetTrackerMutation} from "./budgetTrackerApiSlice";
import moment from "moment";


const BudgetTrackerAdd = () => {
    // State
    const [messageApi, contextHolder] = message.useMessage();
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("expense")
    const [time, setTime] = useState("")
    const refInput = useRef();

    // API
    const [addBudgetTracker, {isLoading}] = useAddBudgetTrackerMutation();

    // Handle
    const onChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async () => {
        // Validate
        if (!description || !amount || !type) {
            message.error("Request complete information.");
            return;
        }

        // Change String to Number
        const parseAmount = Number(amount);

        let parseTime;
        if (!time) {
            parseTime = new Date();
        } else {
            parseTime = new Date(time);
        }

        const key = 'updatable';

        // Open loading message
        messageApi.open({
            key, type: 'loading', content: 'Loading...',
        });

        try {
            const newItem = await addBudgetTracker({description, parseAmount, type, parseTime});

            // Reset fields and autofocus input
            setDescription("");
            setAmount("");
            setTime("")
            if (refInput.current) {
                refInput.current.focus();
            }

            // Close loading message and open success message
            messageApi.open({
                key, type: 'success', content: "Item added successfully", duration: 2,
            });
        } catch (error) {
            // Close loading message and open success message
            messageApi.open({
                key, type: 'error', content: "Error adding budget tracker", duration: 2,
            });
        }
    }

    return (<>
        {contextHolder}
        <div className="budget-tracker-add">
            <Row gutter={10}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Input ref={refInput} value={description} setValue={setDescription} placeholder={"Description"}/>
                </Col>
                <Col xxl={12} xl={24} lg={12} md={12} sm={12} xs={24}>
                    <Input type={'number'} value={amount} setValue={setAmount} placeholder={"Amount"}/>
                </Col>
                <Col xxl={12} xl={24} lg={12} md={12} sm={12} xs={24}>
                    <DatePicker
                        showTime
                        value={time ? moment(time) : null}
                        onChange={(value, dateString) => {
                            setTime(dateString)
                        }}
                    />
                </Col>
                <Col span={24}>
                    <Radio.Group onChange={onChange} value={type}>
                        <Radio value={'expense'}>Expense</Radio>
                        <Radio value={'income'}>Income</Radio>
                    </Radio.Group>
                </Col>
                <Divider/>
                <Col span={24}>
                    <ButtonCustom
                        title={'ADD'}
                        handleButton={handleSubmit}
                        type={"button__submit"}
                        disabled={isLoading}
                    />
                </Col>
            </Row>
        </div>

    </>)
}

export default BudgetTrackerAdd