import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {RootState} from "../store";
import {getContactUsPageQuestions} from "../features/slices/contactUsPageReducer";
import AccordionGrid from "./AccordionGrid";
import {Stack} from "@mui/material";

const AccordionGridLayout = () => {

    const questionsList = useAppSelector((state: RootState) => state.contactUsReducer.questions)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getContactUsPageQuestions())
    }, [dispatch]);

    if(!questionsList) return;

    return (
        <div>
            <Stack spacing={2}>
                {questionsList.map((item, index) => (
                    <AccordionGrid question={item.question} answer={item.answer} key={index} />
                ))}
            </Stack>
        </div>
    );
};

export default AccordionGridLayout;