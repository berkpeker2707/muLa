import React, { Fragment, useEffect, useState } from 'react';
import "../../App.css";
import { Link, withRouter } from "react-router-dom";
import { FaBriefcase, FaPersonBooth, FaBeer, FaSmoking, FaVenusMars, FaLanguage, FaPrayingHands, FaUtensils, FaBirthdayCake } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentUser } from "../../state/actions/currentUserAction"
import { getCurrentUserAvatar} from "../../state/actions/userAvatarAction"
import { updateProfile } from "../../state/actions/updateProfileActions";
import LoadingGif from "../Dashboard/LoadingGif";

import { useForm } from "react-hook-form"
import Uploadfiletest from './Uploadfiletest';

const ProfileUpdate = ({ updateProfile, history, getCurrentUser,getCurrentUserAvatar, user }) => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });

    
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
        { value: "Kothi" }
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
        { value: "Spiritual (but not affiliated with any)" },
        { value: "Others" }
        
    ])
    
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
        { value: "Arabic (Standart)" }
    ]);
    
    const [values, setValues] = useState({
        password: "",
        
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        job: "",
        description: "",
        
        language: "",
        belief: "",
        politics: "",
        diet: "",
        alcohol: "",
        smoking: "",
        
        picture:"",
        
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
        password,
        
        firstname,
        lastname,
        age,
        gender,
        job,
        description,
        
        language,
        belief,
        politics,
        diet,
        alcohol,
        smoking,
        
        picture,
        
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
    
    
    useEffect(() => {
        getCurrentUser();
        getCurrentUserAvatar();
        
    }, [])

   
    // const onChange = (input) => e => {
    //     setValues({
    //         ...values,
    //         [input]: e.target.value
    //     })
    // };

    const onSubmit = (data) => {
        updateProfile(data, history, true);
    }
    
    return (
        <Fragment>
            {
                user.isLoading === true ? <LoadingGif /> : <Fragment >
                    <Uploadfiletest/>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    {user.user.length !== null || undefined ?( 
                        <div className="container">
                                <div className="main-body">
                                    <div className="row gutters-sm">
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                        {/* <div className="mt-3">
                                                            <img src={`http://localhost:1000/me/avatar/${user.user.picture.filename}`} alt="picture" name="picture" className="profilePhoto" />
                                                            <br/>
                                                            <input 
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="picture"
                                                                    name="picture"
                                                                    {...register('picture', { required: { value: true, message: "*Please Upload Photo" } })}
                                                                    />
                                                        </div> */}
                                                        <div className="mt-3">
                                                            <h4>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="firstname"
                                                                    name="firstname"
                                                                    placeholder="Firstname"
                                                                    defaultValue={user.user.firstname}
                                                                    {...register('firstname', { required: { value: true, message: "*Please Enter Firstname" } })} />
                                                                <br />
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="lastname"
                                                                    name="lastname"
                                                                    placeholder="Lastname"
                                                                    defaultValue={user.user.lastname}
                                                                    {...register('lastname', { required: { value: true, message: "*Please Enter Lastname" } })} />
                                                            </h4>
                                                            <hr />
                                                            <p className="font-size-sm">Update Location</p>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaVenusMars />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="gender"
                                                                    name="gender"
                                                                    defaultValue={user.user.gender}
                                                                    {...register('gender', { required: { message: "*Please Enter Gender" } })}
                                                                >{genders.map(gender => (
                                                                    <option key={gender.value} value={genders.gender}>
                                                                        {gender.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                                                <FaBirthdayCake />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <input
                                                                    type="number"
                                                                    min="18"
                                                                    max="122"
                                                                    className="form-control"
                                                                    id="age"
                                                                    name="age"
                                                                    defaultValue={user.user.age}
                                                                    {...register('age', { required: { value: true, message: "*Please Enter Age" } })} />
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaLanguage />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="language"
                                                                    name="language"
                                                                    defaultValue={user.user.language}
                                                                    {...register('language', { required: { message: "*Please Enter Language" } })}
                                                                >{languageChoice.map(language => (
                                                                    <option key={language.value} value={languageChoice.language}>
                                                                        {language.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaBriefcase />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="job"
                                                                    name="job"
                                                                    placeholder="Your Job"
                                                                    defaultValue={user.user.job}
                                                                    {...register('job', { required: { value: true, message: "*Please Enter Job" } })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaPrayingHands />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="belief"
                                                                    name="belief"
                                                                    defaultValue={user.user.belief}
                                                                    {...register('belief', { required: { message: "*Please Enter Belief" } })}
                                                                >{religionChoice.map(belief => (
                                                                    <option key={belief.value} value={religionChoice.belief}>
                                                                        {belief.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaPersonBooth />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="politics"
                                                                    name="politics"
                                                                    defaultValue={user.user.politics}
                                                                    {...register('politics', { required: { message: "*Please Enter Politics" } })}
                                                                >{politicsChoice.map(politics => (
                                                                    <option key={politics.value} value={politicsChoice.politics}>
                                                                        {politics.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaUtensils />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="diet"
                                                                    name="diet"
                                                                    defaultValue={user.user.diet}
                                                                    {...register('diet', { required: { value: true, message: "*Please Enter Diet" } })}
                                                                >{dietChoice.map(diet => (
                                                                    <option key={diet.value} value={dietChoice.diet}>
                                                                        {diet.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaBeer />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="alcohol"
                                                                    name="alcohol"
                                                                    defaultValue={user.user.alcohol}
                                                                    {...register('alcohol', { required: { value: true, message: "*Please Enter Alcohol Consuming Habit" } })}
                                                                >{alcoholChoice.map(alcohol => (
                                                                    <option key={alcohol.value} value={alcoholChoice.alcohol}>
                                                                        {alcohol.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <FaSmoking />
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <select
                                                                    className="form-control"
                                                                    type="radio"
                                                                    id="smoking"
                                                                    name="smoking"
                                                                    defaultValue={user.user.smoking}
                                                                    {...register('smoking', { required: { value: true, message: "*Please Enter Smoking Habit" } })}
                                                                >{smokingChoice.map(smoking => (
                                                                    <option key={smoking.value} value={smokingChoice.diet} >
                                                                        {smoking.value}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row gutters-sm">
                                                <div className="col-sm-12 mb-3">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Character Type:</i>{user.user.characterType}</h6>
                                                            <small>Extraversion - Introversion</small>
                                                            <div className="progress mb-3 progressbarCharacterType">
                                                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.extraversionValue}%` }} aria-valuenow={user.user.extraversionValue} aria-valuemin="0" aria-valuemax="100">{user.user.extraversionValue}%</div>
                                                                <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.introversionValue}%` }} aria-valuenow={user.user.introversionValue} aria-valuemin="0" aria-valuemax="100">{user.user.introversionValue}%</div>
                                                            </div>
                                                            <small>Sensing - Intuition</small>
                                                            <div className="progress mb-3 progressbarCharacterType">
                                                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.sensingValue}%` }} aria-valuenow={user.user.sensingValue} aria-valuemin="0" aria-valuemax="100">{user.user.sensingValue}%</div>
                                                                <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.intuitionValue}%` }} aria-valuenow={user.user.intuitionValue} aria-valuemin="0" aria-valuemax="100">{user.user.intuitionValue}%</div>
                                                            </div>
                                                            <small>Thinking - Feeling</small>
                                                            <div className="progress mb-3 progressbarCharacterType">
                                                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.thinkingValue}%` }} aria-valuenow={user.user.thinkingValue} aria-valuemin="0" aria-valuemax="100">{user.user.thinkingValue}%</div>
                                                                <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.feelingValue}%` }} aria-valuenow={user.user.feelingValue} aria-valuemin="0" aria-valuemax="100">{user.user.feelingValue}%</div>
                                                            </div>
                                                            <small>Judging - Perceiving</small>
                                                            <div className="progress mb-3 progressbarCharacterType">
                                                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.judgingValue}%` }} aria-valuenow={user.user.judgingValue} aria-valuemin="0" aria-valuemax="100">{user.user.judgingValue}%</div>
                                                                <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.perceivingValue}%` }} aria-valuenow={user.user.perceivingValue} aria-valuemin="0" aria-valuemax="100">{user.user.perceivingValue}%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row gutters-sm">
                                                <div className="col-sm-12 mb-3">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Description:</i></h6>
                                                            <p>
                                                                <textarea
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="description"
                                                                    name="description"
                                                                    placeholder="Write Something Fun About Yourself"
                                                                    defaultValue={user.user.description}
                                                                    {...register('description')}
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"auto"}}>
                                        <div className="col-sm-6" >
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Your password"
                                                //value={values.password}
                                                //onChange={onChange("password")} required
                                                {...register('password', { required: { value: true, message: "*Please Enter Password" } })} />
                                        </div>
                                        <div className="col-sm-6" >
                                            <button type="submit" className="btn btn-primary" >
                                                Update My Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>) : <h4>Couldn't Retrieve Your Account</h4>
                        }
                    </form>
                </Fragment>
            }
        </Fragment >
    )
}

ProfileUpdate.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    getCurrentUserAvatar: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    error: PropTypes.string,
})


export default connect(mapStateToProps, { getCurrentUser, getCurrentUserAvatar, updateProfile })(withRouter(ProfileUpdate))