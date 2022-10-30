import React, { useState, useEffect } from "react";
import "../../../App.css";
import Logo2 from "./logo2.png";
import { Row, Col, Modal, Button } from "react-bootstrap";
// import swal from "@sweetalert/with-react";

import { Link, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { preRegisterAction } from "../../../state/slices/authSlices";

import { set, useForm } from "react-hook-form";

//geo
import { usePosition } from "use-position";

const Register = ({ registerUser }) => {
  const dispatch = useDispatch();

  //select state from setScore
  const storeData = useSelector((store) => store?.auth);

  const [show, setShow] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [registeredState, setRegisteredState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  //const { location, error } = useCurrentLocation(geolocationOptions);
  //console.log(location.loaded);
  //console.log(error)
  //const takenLat = location.coordinates.latitude;
  //const takenLong = location.coordinates.longitude;

  const { latitude, longitude, speed, timestamp, accuracy, error } =
    usePosition();

  const [genders] = useState([
    { value: "Man" },
    { value: "Woman" },
    { value: "Agender" },
    { value: "Androgynous" },
    { value: "Bigender" },
    { value: "Gender fluid" },
    { value: "Gender nonconforming" },
    { value: "Gender questioning" },
    { value: "Genderqueer" },
    { value: "Non-binary" },
    { value: "Female to Male" },
    { value: "Male to Female" },
    { value: "Other" },
    { value: "Pangender" },
    { value: "Trans" },
    { value: "Trans Man" },
    { value: "Trans Person" },
    { value: "Trans Woman" },
    { value: "Transfeminine" },
    { value: "Transgender" },
    { value: "Transmasculine" },
    { value: "Transsexual" },
    { value: "Hijra" },
    { value: "Intersex" },
    { value: "Kothi" },
  ]);

  const [politicsChoice] = useState([
    { value: " " },
    { value: "Communism" },
    { value: "Anarcho-communism" },
    { value: "Socialism" },
    { value: "Democratic Socialism" },
    { value: "Eco-socialism" },
    { value: "Social Democracy" },
    { value: "Progressivism" },
    { value: "Liberalism" },
    { value: "Social Liberalism" },
    { value: "Centeralist" },
    { value: "Religious Democracy" },
    { value: "Liberal Conservatism" },
    { value: "Conservatism" },
    { value: "Economic Liberalism" },
    { value: "Libertarianism" },
    { value: "Nationalism" },
    { value: "Anarcho-Capitalism" },
    { value: "Others" },
  ]);

  const [religionChoice] = useState([
    { value: " " },
    { value: "Christianity" },
    { value: "Islam" },
    { value: "Hinduism" },
    { value: "Buddhism" },
    { value: "Confucianism" },
    { value: "Taoism" },
    { value: "Sikhism" },
    { value: "Judaism" },
    { value: "Spiritism" },
    { value: "Bahai" },
    { value: "Jainism" },
    { value: "Shinto" },
    { value: "Cao Dai" },
    { value: "Zoroastrianism" },
    { value: "Tenrikyo" },
    { value: "Animism" },
    { value: "Druze" },
    { value: "Paganism" },
    { value: "Rastafari" },
    { value: "Agnostic atheism" },
    { value: "Agnosticism" },
    { value: "Apatheism" },
    { value: "Atheism" },
    { value: "Deism" },
    { value: "Naturalism" },
    { value: "Spiritual" },
    { value: "Others" },
  ]);

  const [dietChoice] = useState([
    { value: "Omnivore Diet" },
    { value: "Vegetarian Diet" },
    { value: "Vegan Diet" },
    { value: "Pescetarian Diet" },
    { value: "Low-Carb Diets" },
    { value: "Low-Fat Diet" },
    { value: "Mediterranean Diet" },
    { value: "Fruitarian Diet" },
    { value: "Paleo Diet" },
    { value: "The Ketogenic Diet" },
    { value: "Others" },
  ]);
  const [alcoholChoice] = useState([
    { value: "Frequently" },
    { value: "Sometimes" },
    { value: "Rarely" },
    { value: "Never" },
  ]);
  const [smokingChoice] = useState([
    { value: "Frequently" },
    { value: "Sometimes" },
    { value: "Rarely" },
    { value: "Never" },
  ]);

  const [languageChoice] = useState([
    { value: "English" },
    { value: "Mandarin Chinese" },
    { value: "Spanish" },
    { value: "Hindi" },
    { value: "Bengali" },
    { value: "Portuguese" },
    { value: "Russian" },
    { value: "Japanese" },
    { value: "Western Punjabi" },
    { value: "Marathi" },
    { value: "Telugu" },
    { value: "Wu Chinese" },
    { value: "Turkish" },
    { value: "Korean" },
    { value: "French" },
    { value: "German" },
    { value: "Vietnamese" },
    { value: "Tamil" },
    { value: "Yue Chinese" },
    { value: "Urdu" },
    { value: "Javanese" },
    { value: "Italian" },
    { value: "Egyptian Arabic" },
    { value: "Gujarati" },
    { value: "Iranian Persian" },
    { value: "Bhojpuri" },
    { value: "Min Nan Chinese" },
    { value: "Hakka Chinese" },
    { value: "Jin Chinese" },
    { value: "Hausa" },
    { value: "Kannada" },
    { value: "Indonesian" },
    { value: "Polish" },
    { value: "Yoruba" },
    { value: "Xiang Chinese" },
    { value: "Malayalam" },
    { value: "Odia" },
    { value: "Maithili" },
    { value: "Burmese" },
    { value: "Eastern Punjabi" },
    { value: "Sunda" },
    { value: "Sudanese Arabic" },
    { value: "Algerian Arabic" },
    { value: "Moroccan Arabic" },
    { value: "Ukrainian" },
    { value: "Igbo" },
    { value: "Northern Uzbek" },
    { value: "Sindhi" },
    { value: "North Levantine Arabic" },
    { value: "Romanian" },
    { value: "Tagalog" },
    { value: "Dutch" },
    { value: "Saʽidi Arabic" },
    { value: "Gan Chinese" },
    { value: "Amharic" },
    { value: "Northern Pashto" },
    { value: "Magahi" },
    { value: "Thai" },
    { value: "Saraiki" },
    { value: "Khmer" },
    { value: "Chhattisgarhi" },
    { value: "Somali" },
    { value: "Malaysian" },
    { value: "Cebuano" },
    { value: "Nepali" },
    { value: "Mesopotamian Arabic" },
    { value: "Assamese" },
    { value: "Sinhalese" },
    { value: "Northern Kurdish" },
    { value: "Hejazi Arabic" },
    { value: "Nigerian Fulfulde" },
    { value: "Bavarian" },
    { value: "Azerbaijani" },
    { value: "Greek" },
    { value: "Chittagonian" },
    { value: "Kazakh" },
    { value: "Deccan" },
    { value: "Hungarian" },
    { value: "Kinyarwanda" },
    { value: "Zulu" },
    { value: "South Levantine Arabic" },
    { value: "Tunisian Arabic" },
    { value: "San'ani Arabic" },
    { value: "Min Bei Chinese" },
    { value: "Southern Pashto" },
    { value: "Rundi" },
    { value: "Czech" },
    { value: "Taʽizzi-Adeni Arabic" },
    { value: "Uyghur" },
    { value: "Min Dong Chinese" },
    { value: "Sylheti" },
    { value: "Bulgarian" },
    { value: "Chinese (Standart)" },
    { value: "Arabic (Standart)" },
  ]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    job: "",
    description: "",

    userLatitude: "",
    userLongitude: "",

    language: "",
    belief: "",
    politics: "",
    location: "",
    diet: "",
    alcohol: "",
    smoking: "",

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
    userLatitude,
    userLongitude,

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

  const [checked, setChecked] = useState(true);

  let questions = require("./testQuestions.json");

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

  const [stateLat, setLat] = useState(0);
  const [stateLong, setLong] = useState(0);

  //useEffect(() => {
  //    if (!location) {
  //        return console.log(error + "\n" + "Please allow location access and refresh the page.");
  //    } else {
  //        setValues(values => ({ ...values, userLatitude: takenLat }))
  //        setValues(values => ({ ...values, userLongitude: takenLong }))
  //        console.log(values.userLatitude)
  //        console.log(values.userLongitude)
  //    }
  //}, [takenLat, takenLong]);

  //console.log(values);

  useEffect(() => {
    if (latitude) {
      setLat(latitude);
    }
  });
  useEffect(() => {
    if (longitude) {
      setLong(latitude);
    }
  });

  function changeBackground(e) {
    e.target.style.background = "whitesmoke";
    e.target.style.border = "whitesmoke";
  }

  function changeBackgroundBack(e) {
    e.target.style.background = "#d2fdff";
  }

  const prevButtonClicked = (e) => {
    e.preventDefault();

    const prevQuestion = currentQuestion - 1;
    if (prevQuestion === -1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(prevQuestion);
    }
  };

  const answerButtonClicked = (
    e,
    scoreE,
    scoreI,
    scoreS,
    scoreN,
    scoreT,
    scoreF,
    scoreJ,
    scoreP
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
      setQuestionsEnded(true);
    }

    //setTextColor(questions[currentQuestion].answerOptions[0] === "red");

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuestionsEnded(true);
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
    characterTypeArray.push("E");
  } else {
    characterTypeArray.push("I");
  }
  if (values.sensingValue > values.intuitionValue) {
    characterTypeArray.push("S");
  } else {
    characterTypeArray.push("N");
  }
  if (values.thinkingValue > values.feelingValue) {
    characterTypeArray.push("T");
  } else {
    characterTypeArray.push("F");
  }
  if (values.judgingValue > values.perceivingValue) {
    characterTypeArray.push("J");
  } else {
    characterTypeArray.push("P");
  }
  values.characterType = characterTypeArray.join("").toString();
  //console.log(values.characterType)

  values.userLatitude = stateLat;
  values.userLongitude = stateLong;

  const [step, setStep] = useState(0);

  // process to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // process to previous step
  {
    /*const prevStep = () => {
        setStep(step - 1)
    }*/
  }

  const onChange = (input) => (e) => {
    setValues({
      ...values,
      [input]: e.target.value,
    });
  };

  const onSubmit = (data) => {
    dispatch(preRegisterAction(data));
  };

  const { isLoading, appErr, serverErr, registered } = storeData;

  useEffect(() => {
    setErrorHappened(appErr, serverErr);
  }, [appErr, serverErr]);

  const onClickSubmit = () => {
    {
      appErr || serverErr
        ? // swal({
          //     title: `${serverErr}`,
          //     text: `${appErr}`,
          //     icon: "error",
          //   })
          console.log(appErr, serverErr)
        : //  swal({
          //     title: "Submitted!",
          //     text: "You'll recieve an activation email.",
          //     icon: "success",
          //   });
          console.log(appErr, serverErr);
    }
  };

  // console.log(registered);

  if (registered) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step >= 0 && (
        <section
          style={step === 0 ? { display: "block" } : { display: "none" }}
        >
          <div className="register-component">
            <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
              {/* <img src={Logo2} alt="Logo2" /> */}
            </Link>
            <hr />
            <h1 style={{ fontSize: "40px" }}>Register Step 1</h1>
            {/* <div> */}
            {/*<p>
                                        Latitude: {location.latitude}, Longitude: {location.longitude}
                                    </p>*/}
            {/* <input
                                        type="hidden"
                                        className="form-control"
                                        id="userLatitude"
                                        name="userLatitude"
                                        {...register('userLatitude')} /> */}
            {/* {errors.userLatitude && <p style={{ fontSize: "12px", color: "yellow", textAlign: "start" }}>{errors.userLatitude.message}</p>} */}
            {/* <br />
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        id="userLongitude"
                                        name="userLongitude"
                                        {...register('userLongitude')} /> */}
            {/* {errors.userLongitude && <p style={{ fontSize: "12px", color: "yellow", textAlign: "start" }}>{errors.userLongitude.message}</p>} */}

            {/* <p style={{ color: "yellow" }}>Please allow location access & refresh the page...</p>
                                </div> */}
            <div className="form-group">
              <br />
              <label>Your Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Your email adress"
                {...register("email", {
                  required: {
                    value: true,
                    message: "*Please Enter Email",
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  },
                })}
              />
              {errors.email && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
              <br />
              <label>Your Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Your password"
                //value={values.password}
                //onChange={onChange("password")} required
                {...register("password", {
                  required: { value: true, message: "*Please Enter Password" },
                })}
              />
              {errors.password && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>
            <br />
            <div className="form-group">
              <label>Your First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Firstname"
                {...register("firstname", {
                  required: { value: true, message: "*Please Enter Firstname" },
                })}
              />
              {errors.firstname && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.firstname.message}
                </p>
              )}
              <br />
              <label>Your Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Lastname"
                {...register("lastname", {
                  required: { value: true, message: "*Please Enter Lastname" },
                })}
              />
              {errors.lastname && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.lastname.message}
                </p>
              )}
              <br />
            </div>
            <div className="form-group">
              {latitude ? (
                <button
                  type="button"
                  disabled={!isValid}
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next
                </button>
              ) : (
                <div>
                  <button type="button" disabled className="btn btn-primary">
                    Next
                  </button>
                  <br />
                  <br />
                  <p style={{ color: "yellow" }}>
                    *Please allow location access on your browser
                    <br />
                    and refresh the page.
                  </p>
                </div>
              )}
            </div>
            <hr />
            <Link to="/login" style={{ color: "white" }}>
              Already have account? <br />
              Click to Login!
            </Link>
          </div>
        </section>
      )}

      {/*///////////////////////////////////////////////////////////*/}
      {step >= 1 && (
        <section
          style={step === 1 ? { display: "block" } : { display: "none" }}
        >
          <div className="register-component">
            <h1 style={{ fontSize: "40px" }}>
              Register Step 2 <br />
              <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                {/* <img src={Logo2} alt="Logo2" /> */}
              </Link>
            </h1>
            <div className="form-group">
              <label>Your Age</label>
              <input
                type="number"
                min="18"
                max="122"
                className="form-control"
                id="age"
                name="age"
                placeholder="Age"
                {...register("age", {
                  required: { value: true, message: "*Please Enter Age" },
                })}
              />
              {errors.age && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.age.message}
                </p>
              )}
              <label>Your Gender</label>
              <select
                className="form-control"
                type="radio"
                id="gender"
                name="gender"
                {...register("gender", {
                  required: { message: "*Please Enter Gender" },
                })}
              >
                {genders.map((gender) => (
                  <option key={gender.value} value={genders.gender}>
                    {gender.value}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>What's your craft?</label>
              <input
                type="text"
                className="form-control"
                id="job"
                name="job"
                placeholder="Your Job"
                {...register("job", {
                  required: { value: true, message: "*Please Enter Job" },
                })}
              />
              {errors.job && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.job.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Give us anything fun about you!</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Write Something Fun About Yourself"
                {...register("description", {
                  required: {
                    value: true,
                    message: "*Please Enter Description",
                  },
                })}
              />
              {errors.description && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <br />
              {/*<button type="button" onClick={prevStep} className="btn btn-primary" style={{ margin: "10px" }}>
                            Back
                        </button>*/}
              <button
                type="button"
                disabled={!isValid}
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
            <br />
            <Link to="/login" style={{ color: "white" }}>
              Already have account? <br />
              Click to Login!
            </Link>
          </div>
        </section>
      )}

      {/*///////////////////////////////////////////////////////////*/}
      {step >= 2 && (
        <section
          style={step === 2 ? { display: "block" } : { display: "none" }}
        >
          <div className="register-component">
            <h1 style={{ fontSize: "40px" }}>
              Register Step 3 <br />
              <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                {/* <img src={Logo2} alt="Logo2" /> */}
              </Link>
            </h1>
            <div className="form-group">
              <label>Your Language</label>
              <select
                className="form-control"
                type="radio"
                id="language"
                name="language"
                {...register("language", {
                  required: { message: "*Please Enter Language" },
                })}
              >
                {languageChoice.map((language) => (
                  <option key={language.value} value={languageChoice.language}>
                    {language.value}
                  </option>
                ))}
              </select>
              <br />
              <label>
                Your Belief<sup> (optional)</sup>
              </label>
              <select
                className="form-control"
                type="radio"
                id="belief"
                name="belief"
                {...register("belief", {
                  required: { message: "*Please Enter Belief" },
                })}
              >
                {religionChoice.map((belief) => (
                  <option key={belief.value} value={religionChoice.belief}>
                    {belief.value}
                  </option>
                ))}
              </select>
              {errors.belief && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.belief.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>
                Politics<sup> (optional)</sup>
              </label>
              <select
                className="form-control"
                type="radio"
                id="politics"
                name="politics"
                {...register("politics", {
                  required: { message: "*Please Enter Politics" },
                })}
              >
                {politicsChoice.map((politics) => (
                  <option key={politics.value} value={politicsChoice.politics}>
                    {politics.value}
                  </option>
                ))}
              </select>
              {errors.politics && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.politics.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Diet</label>
              <select
                className="form-control"
                type="radio"
                id="diet"
                name="diet"
                {...register("diet", {
                  required: { message: "*Please Enter Diet" },
                })}
              >
                {dietChoice.map((diet) => (
                  <option key={diet.value} value={dietChoice.diet}>
                    {diet.value}
                  </option>
                ))}
              </select>
              {errors.diet && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.diet.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Alcohol</label>
              <select
                className="form-control"
                type="radio"
                id="alcohol"
                name="alcohol"
                {...register("alcohol", {
                  required: {
                    message: "*Please Enter Alcohol Consuming Habit",
                  },
                })}
              >
                {alcoholChoice.map((alcohol) => (
                  <option key={alcohol.value} value={alcoholChoice.alcohol}>
                    {alcohol.value}
                  </option>
                ))}
              </select>
              {errors.alcohol && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.alcohol.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Smoking</label>
              <select
                className="form-control"
                type="radio"
                id="smoking"
                name="smoking"
                {...register("smoking", {
                  required: { message: "*Please Enter Smoking Habit" },
                })}
              >
                {smokingChoice.map((smoking) => (
                  <option key={smoking.value} value={smokingChoice.diet}>
                    {smoking.value}
                  </option>
                ))}
              </select>
              {errors.smoking && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "yellow",
                    textAlign: "start",
                  }}
                >
                  {errors.smoking.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <br />
              {/*<button type="button" onClick={prevStep} className="btn btn-primary" style={{ margin: "10px" }}>
                            Back
                        </button>*/}
              <button
                type="button"
                disabled={!isValid}
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
            <br />
            <Link to="/login" style={{ color: "white" }}>
              Already have account? <br />
              Click to Login!
            </Link>
          </div>
        </section>
      )}

      {/*///////////////////////////////////////////////////////////*/}

      {step >= 3 && (
        <section
          style={step === 3 ? { display: "block" } : { display: "none" }}
        >
          <div className="register-component registertest">
            <h1 style={{ fontSize: "40px" }}>
              Register Step 4 <br />
              <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                {/* <img src={Logo2} alt="Logo2" /> */}
              </Link>
            </h1>
            <div className="form-group">
              <h3>
                Question {currentQuestion + 1} / {questions.length}
              </h3>
              <hr />
              <label key={currentQuestion.questionText}>
                {questions[currentQuestion].questionText}
              </label>
              <br />

              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <Row
                  className="justify-content-md-center"
                  container="fluid"
                  key={answerOption.answerText}
                >
                  <Col
                    /*className="text-left"*/ md="auto"
                    xs={12}
                    id={answerOption.answerText}
                  >
                    {questionsEnded ? (
                      <input
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: "5px" }}
                        value={answerOption.answerText}
                        disabled
                      />
                    ) : (
                      <input
                        type="button"
                        required
                        style={{ margin: "5px" }}
                        onMouseOver={changeBackground}
                        onMouseLeave={changeBackgroundBack}
                        onClick={(e) =>
                          answerButtonClicked(
                            e,
                            answerOption.scoreE,
                            answerOption.scoreI,
                            answerOption.scoreS,
                            answerOption.scoreN,
                            answerOption.scoreT,
                            answerOption.scoreF,
                            answerOption.scoreJ,
                            answerOption.scoreP
                          )
                        }
                        className="btn btn-primary"
                        value={answerOption.answerText}
                      />
                    )}
                  </Col>
                </Row>
              ))}
            </div>

            <div className="form-group">
              {/*<button onClick={prevButtonClicked} className="btn btn-primary" style={{ margin: "15px" }}>
                            Prev Question
                        </button>
                        <br />
                        <button type="button" onClick={prevStep} className="btn btn-primary" style={{ margin: "10px" }}>
                            Back
                        </button>*/}
              {questionsEnded ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  title="Please answer all questions."
                  type="button"
                  disabled
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>

            <br />
            <Link to="/login" style={{ color: "white" }}>
              Already have account? <br />
              Click to Login!
            </Link>
          </div>
        </section>
      )}

      {/*////////////////////////////////////////////////*/}

      {questionsEnded ? (
        step >= 4 && (
          <section
            style={step === 4 ? { display: "block" } : { display: "none" }}
          >
            <div className="register-component">
              <h1 style={{ fontSize: "40px" }}>
                Register Step 5 <br />
                <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                  {/* <img src={Logo2} alt="Logo2" /> */}
                </Link>
              </h1>
              <br />
              <div style={{ height: "0px" }}>
                <input
                  type="hidden"
                  id="extraversionValue"
                  name="extraversionValue"
                  value={extraversionValue}
                  onChange={onChange("extraversionValue")}
                  {...register("extraversionValue", {
                    required: { value: true },
                  })}
                />

                <input
                  type="hidden"
                  id="introversionValue"
                  name="introversionValue"
                  value={introversionValue}
                  onChange={onChange("introversionValue")}
                  {...register("introversionValue", {
                    required: { value: true },
                  })}
                />

                <input
                  type="hidden"
                  id="sensingValue"
                  name="sensingValue"
                  value={sensingValue}
                  onChange={onChange("sensingValue")}
                  {...register("sensingValue", { required: { value: true } })}
                />

                <input
                  type="hidden"
                  id="intuitionValue"
                  name="intuitionValue"
                  value={intuitionValue}
                  onChange={onChange("intuitionValue")}
                  {...register("intuitionValue", { required: { value: true } })}
                />

                <input
                  type="hidden"
                  id="thinkingValue"
                  name="thinkingValue"
                  value={thinkingValue}
                  onChange={onChange("thinkingValue")}
                  {...register("thinkingValue", { required: { value: true } })}
                />

                <input
                  type="hidden"
                  id="feelingValue"
                  name="feelingValue"
                  value={feelingValue}
                  onChange={onChange("feelingValue")}
                  {...register("feelingValue", { required: { value: true } })}
                />

                <input
                  type="hidden"
                  id="judgingValue"
                  name="judgingValue"
                  value={judgingValue}
                  onChange={onChange("judgingValue")}
                  {...register("judgingValue", { required: { value: true } })}
                />

                <input
                  type="hidden"
                  id="perceivingValue"
                  name="perceivingValue"
                  value={perceivingValue}
                  onChange={onChange("perceivingValue")}
                  {...register("perceivingValue", {
                    required: { value: true },
                  })}
                />

                <input
                  type="hidden"
                  id="characterType"
                  name="characterType"
                  value={characterType}
                  onChange={onChange("characterType")}
                  {...register("characterType", { required: { value: true } })}
                />
                <br />

                <input
                  type="hidden"
                  id="userLatitude"
                  name="userLatitude"
                  value={userLatitude}
                  onChange={onChange("userLatitude")}
                  {...register("userLatitude", { required: { value: true } })}
                />
                {/* {errors.userLatitude && <p style={{ fontSize: "12px", color: "yellow", textAlign: "start" }}>{errors.userLatitude.message}</p>} */}

                <br />
                <input
                  type="hidden"
                  id="userLongitude"
                  name="userLongitude"
                  value={userLongitude}
                  onChange={onChange("userLongitude")}
                  {...register("userLongitude", { required: { value: true } })}
                />
                {/* {errors.userLongitude && <p style={{ fontSize: "12px", color: "yellow", textAlign: "start" }}>{errors.userLongitude.message}</p>} */}
                <br />
              </div>
              <br />
              <div className="form-group form-check">
                <div>
                  <Button
                    to="#"
                    variant="secondary"
                    onClick={() => setShow(true)}
                  >
                    Terms of Use
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        <h3 style={{ color: "black" }}>Terms of Use</h3>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ol style={{ color: "black" }}>
                        <li>
                          You must read and agree to our Terms of Use (the
                          “Agreement”) because it forms the binding contract
                          between you and muLa. However, we’ve provided this
                          short summary for your convenience (with capitalized
                          terms defined in the Agreement).
                        </li>
                        <li>
                          Acceptance. By using the Service, you agree to this
                          Agreement, our Privacy Policy and Safety Tips, and any
                          terms that apply to in app purchase you make.
                        </li>
                        <li>
                          Eligibility. You must be at least 18 to use the
                          Service and not prohibited by law from using the
                          Service. You promise to follow the law and that you’re
                          not a convicted felon or sex offender.
                        </li>
                        <li>
                          Your Account. If you use Facebook to access muLa, you
                          must authorize us to access certain information from
                          Facebook to use muLa. You agree to keep your account
                          secure and confidential.
                        </li>
                        <li>
                          Modifying the Services; Termination. We may modify the
                          Services at any time or discontinue them altogether.
                          You can terminate your account in Settings, and we
                          reserve the right to terminate it for you if you
                          violate this Agreement or if we deem your use of the
                          Service to be inappropriate.
                        </li>
                        <li>
                          Safety. muLa is not responsible for the actions of its
                          users or your interactions with them, and we don’t
                          conduct background checks. Be careful and be sure to
                          read and follow our Safety Tips on interacting with
                          people on or off of muLa.
                        </li>
                        <li>
                          Rights. muLa grants you the right to use our Service
                          as authorized and permitted by this Agreement. See the
                          Agreement for a full list of actions you agree not to
                          take. You grant muLa the right to display your profile
                          and Content for the limited purpose of muLa operating
                          the Service and researching and developing new ones.
                        </li>
                        <li>
                          Rules. See the Agreement for a list of the rules you
                          agree to abide by when you use muLa, such as not
                          soliciting money from other users, harassing other
                          users or using the Service for any illegal purposes.
                        </li>
                        <li>
                          In App Purchases. muLa may offer services for purchase
                          through mobile platforms such as iTunes and Google
                          Play. Those purchases are governed by the terms of the
                          platforms. Most purchases are not refundable and
                          certain services only grant you a specified license,
                          as further described in the Agreement.
                        </li>
                        <li>
                          Copyright. If you believe your work has been posted on
                          the Service in violation of your copyright, please
                          send a notice to our Copyright Agent following
                          instructions in the Agreement.
                        </li>
                        <li>
                          Disclaimers. Our Service is provided “as is,” and we
                          disclaim legal liability for the quality, safety, or
                          reliability of our Service.
                        </li>
                        <li>
                          Limitation of Liability. To the extent allowed by law,
                          we limit our liability to you for certain types of
                          damages for claims relating to your use of the
                          Service, the conduct of other users and unauthorized
                          access or use of your Content. Our aggregate liability
                          will not exceed the fees you pay us.
                        </li>
                        <li>
                          Arbitration. Our Agreement contains a mandatory
                          arbitration clause. You agree that any disputes will
                          be settled by arbitration, and you waive your right to
                          a trial by jury or to participate in a class action.
                          This does not apply to users residing in the EU,
                          Norway or elsewhere where prohibited by law.
                        </li>
                        <li>
                          Governing Law; Venue. Texas law applies to this
                          Agreement. Actions for disputes relating to this
                          Agreement must be brought in Dallas, Texas, except for
                          users residing in the EU or Norway, who may bring
                          claims in their country of residence.
                        </li>
                        <li>
                          Indemnity. You agree to indemnify us for actions
                          arising out of your use of the Service, your Content
                          or your violation of this Agreement.
                        </li>
                      </ol>
                    </Modal.Body>
                  </Modal>
                </div>
                <br />
                <input
                  name="acceptTerms"
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  {...register("acceptTerms", {
                    required: {
                      value: true,
                      message:
                        "*Please accept terms & click submit to complete register.",
                    },
                  })}
                  id="acceptTerms"
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  Accept "Terms of Use"
                </label>
                {errors.acceptTerms && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "yellow",
                      textAlign: "start",
                    }}
                  >
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
              {!errors.acceptTerms ? (
                <div className="form-group">
                  <button
                    type="submit"
                    onClick={() => onClickSubmit()}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="form-group">
                  <button type="submit" disabled className="btn btn-primary">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </section>
        )
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default Register;
