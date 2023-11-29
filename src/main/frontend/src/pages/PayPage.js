import React from "react";
import useAuth from "../useAuth";

const PayPage = () => {
    useAuth();
    return (
        <>
            <div>
                <h1>PayPage</h1>
            </div>
        </>
    );
};

export default PayPage;