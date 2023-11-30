import React from "react";
import useAuth from "../useAuth";

const BookPage = () => {
    useAuth();
    return (
        <>
            <div>
                <h1>BookPage</h1>
            </div>
        </>
    );
};

export default BookPage;