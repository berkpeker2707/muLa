import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form"

const ReTakeTest = ({ reTakeTestUpdate }) => {

    const { register, handleSubmit } = useForm({ mode: "all" });

    const [values, setValues] = useState({
        extraversionValue: "",
        introversionValue: "",
        sensingValue: "",
        intuitionValue: "",
        thinkingValue: "",
        feelingValue: "",
        judgingValue: "",
        perceivingValue: "",
        characterType: "",
    });

    const {
        extraversionValue,
        introversionValue,
        sensingValue,
        intuitionValue,
        thinkingValue,
        feelingValue,
        judgingValue,
        perceivingValue,
        characterType,
    } = values;

    let questions = require('../../Landing/Register/testQuestions.json');

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [questionsEnded, setQuestionsEnded] = useState(false);

    const [scoreECount, setScoreE] = useState(0);
    const [scoreICount, setScoreI] = useState(0);
    const [scoreSCount, setScoreS] = useState(0);
    const [scoreNCount, setScoreN] = useState(0);
    const [scoreTCount, setScoreT] = useState(0);
    const [scoreFCount, setScoreF] = useState(0);
    const [scoreJCount, setScoreJ] = useState(0);
    const [scorePCount, setScoreP] = useState(0);

    function changeBackground(e) {
        e.target.style.background = 'whitesmoke';
        e.target.style.border = 'whitesmoke';
    }

    function changeBackgroundBack(e) {
        e.target.style.background = "#d2fdff"
    }

    const answerButtonClicked = (
        e,
        scoreE,
        scoreI,
        scoreS,
        scoreN,
        scoreT,
        scoreF,
        scoreJ,
        scoreP,
    ) => {
        e.preventDefault();

        if (scoreE === true) {
            setScoreE(scoreECount + 1);
        } else if (scoreI === true) {
            setScoreI(scoreICount + 1);
        } else if (scoreS === true) {
            setScoreS(scoreSCount + 1);
        } else if (scoreN === true) {
            setScoreN(scoreNCount + 1);
        } else if (scoreT === true) {
            setScoreT(scoreTCount + 1);
        } else if (scoreF === true) {
            setScoreF(scoreFCount + 1);
        } else if (scoreJ === true) {
            setScoreJ(scoreJCount + 1);
        } else if (scoreP === true) {
            setScoreP(scorePCount + 1);
        } else if (scoreP + scoreJ === 20) {
            setQuestionsEnded(true)
        }

        //setTextColor(questions[currentQuestion].answerOptions[0] === "red");

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setQuestionsEnded(true)
        }

    };

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    values.extraversionValue = percentage(scoreECount, 10);
    values.introversionValue = percentage(scoreICount, 10);
    values.sensingValue = percentage(scoreSCount, 20);
    values.intuitionValue = percentage(scoreNCount, 20);
    values.thinkingValue = percentage(scoreTCount, 20);
    values.feelingValue = percentage(scoreFCount, 20);
    values.judgingValue = percentage(scoreJCount, 20);
    values.perceivingValue = percentage(scorePCount, 20);

    var characterTypeArray = [];
    if (values.extraversionValue > values.introversionValue) {
        characterTypeArray.push("E")
    } else {
        characterTypeArray.push("I")
    }
    if (values.sensingValue > values.intuitionValue) {
        characterTypeArray.push("S")
    } else {
        characterTypeArray.push("N")
    }
    if (values.thinkingValue > values.feelingValue) {
        characterTypeArray.push("T")
    } else {
        characterTypeArray.push("F")
    }
    if (values.judgingValue > values.perceivingValue) {
        characterTypeArray.push("J")
    } else {
        characterTypeArray.push("P")
    }
    values.characterType = characterTypeArray.join("").toString();
    //console.log(values.characterType)

    const [step, setStep] = useState(0)

    // process to next step
    const nextStep = () => {
        setStep(step + 1)
    }

    // process to previous step
    {/*const prevStep = () => {
        setStep(step - 1)
    }*/}

    const onChange = (input) => e => {
        setValues({
            ...values,
            [input]: e.target.value
        })
    };

    const onSubmit = (data) => {
        //console.log(data)
        reTakeTestUpdate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {step >= 0 && <section style={step === 0 ? { display: "block" } : { display: "none" }}>
                <div className="register-component registertest">
                    <div className="form-group">
                        <h3>
                            Question {currentQuestion + 1} / {questions.length}
                        </h3>
                        <hr />
                        <label key={currentQuestion.questionText}>{questions[currentQuestion].questionText}</label>
                        <br />

                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <Row className="justify-content-md-center" container="fluid" key={answerOption.answerText} >
                                <Col /*className="text-left"*/ md="auto" xs={12} id={answerOption.answerText}>
                                    {questionsEnded ? <input type="button" className="btn btn-primary" style={{ margin: "5px" }} value={answerOption.answerText} disabled /> : <input type="button" required style={{ margin: "5px" }}
                                        onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}
                                        onClick={(e) => answerButtonClicked(
                                            e,
                                            answerOption.scoreE,
                                            answerOption.scoreI,
                                            answerOption.scoreS,
                                            answerOption.scoreN,
                                            answerOption.scoreT,
                                            answerOption.scoreF,
                                            answerOption.scoreJ,
                                            answerOption.scoreP,
                                        )} className="btn btn-primary" value={answerOption.answerText} />}
                                </Col>
                            </Row>)
                        )}
                    </div>

                    <div className="form-group">
                        {/*<button onClick={prevButtonClicked} className="btn btn-primary" style={{ margin: "15px" }}>
                            Prev Question
                        </button>
                        <br />
                        <button type="button" onClick={prevStep} className="btn btn-primary" style={{ margin: "10px" }}>
                            Back
                        </button>*/}
                        {questionsEnded ? (<button type="button" onClick={nextStep} className="btn btn-primary">
                            Next
                        </button>) : <button title="Please answer all questions." type="button" disabled className="btn btn-primary">
                            Next
                        </button>}
                    </div>

                    <br />
                    <Link className="alreadyHaveAccountButton" to="/login">
                        Already have account? <br />Click to Login!
                    </Link>
                </div>
            </section>
            }

            {/*////////////////////////////////////////////////*/}

            {questionsEnded ? (step >= 1 && <section style={step === 1 ? { display: "block" } : { display: "none" }}>
                <div className="register-component">
                    <br />
                    <div>
                        <h1>Please accept terms & click submit to complete register.</h1>
                        <input type="hidden" id="extraversionValue"
                            name="extraversionValue"
                            value={extraversionValue}
                            onChange={onChange("extraversionValue")}
                            {...register('extraversionValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="introversionValue"
                            name="introversionValue"
                            value={introversionValue}
                            onChange={onChange("introversionValue")}
                            {...register('introversionValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="sensingValue"
                            name="sensingValue"
                            value={sensingValue}
                            onChange={onChange("sensingValue")}
                            {...register('sensingValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="intuitionValue"
                            name="intuitionValue"
                            value={intuitionValue}
                            onChange={onChange("intuitionValue")}
                            {...register('intuitionValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="thinkingValue"
                            name="thinkingValue"
                            value={thinkingValue}
                            onChange={onChange("thinkingValue")}
                            {...register('thinkingValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="feelingValue"
                            name="feelingValue"
                            value={feelingValue}
                            onChange={onChange("feelingValue")}
                            {...register('feelingValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="judgingValue"
                            name="judgingValue"
                            value={judgingValue}
                            onChange={onChange("judgingValue")}
                            {...register('judgingValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="perceivingValue"
                            name="perceivingValue"
                            value={perceivingValue}
                            onChange={onChange("perceivingValue")}
                            {...register('perceivingValue', { required: { value: true } })}
                        />

                        <input type="hidden" id="characterType"
                            name="characterType"
                            value={characterType}
                            onChange={onChange("characterType")}
                            {...register('characterType', { required: { value: true } })}
                        />
                        <br /> After registering you'll recieve activation email.</div>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </section>) : (<div></div>)}
        </form>
    )

}

export default ReTakeTest;