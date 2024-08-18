import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {HashLoader, PropagateLoader} from "react-spinners";

const override = {
    position: "fixed",
    top: '42%',
    left: "50%",
    borderColor: "red",
};


function Loading({loading}) {

    return (
        <HashLoader
            color="#27D799"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Loading;
