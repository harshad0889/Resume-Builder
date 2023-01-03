import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { reducerConstants, alertConstants } from "../_constants";
import { LoadingModal } from "../_components";
import { miscActions } from "../_actions";
import AsyncSelect from "react-select/async";
import { authHeader } from "../_helpers";
import { apiConstants } from "../_constants";
import { history } from "../_helpers";


let category = ''
let othercat = []
const ResumeAdd = (props) => {
  const [candidate, setCandidate] = useState({
    name: "",
    ni_number: "",
    address: "",
    address_line2: "",
    postcode: "",
    location: "",
    gender: "",
    working_limit: "",
    email: "",
    contact_number: "",
    experience: "",
    about: "",
    active_status: 1,
    // active_status: '',
    vaccination_status: "",
    other_documents: "",
    category: "",
    night_price: "",
    evening_price: 0,
    weekend_night_price: "",
    weekend_day_price: "",
    visatype: "",
    role: 3,
    is_temp_candidate: 1,
    response_status: "",
    ni_hour: 20
  });
  const currentdate = new Date().toISOString().slice(0, 10);
  const [PostcodeObject, setPostcodeObject] = useState({})
  const [Disabled, setDisabled] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [other_categories, setother_categories] = useState([])
  const [isEditcategory, setisEditcategory] = useState(false);
  const [candidateupload, setcandidateupload] = useState({
    photo: "",
    dbs: "",
    ni: "",
    passport: "",
    brp: "",
    bank_statement: "",
    p45_p60: "",
    training_certificate: "",
    profile_sheet: "",

    vaccination_certificate: "",
  });
  const [query, setQuery] = useState({
    pageVo: {
      pageNo: 1,
      noOfItems: 15,
    },
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUpload, setisFileUpload] = useState(false);
  const [addratingmodal, setaddratingmodal] = useState(false);

  const [categoriesrows, setcategoriesrows] = useState();
  const [showmodalfileupload, setshowmodalfileupload] = useState(false);
  const [countries, setCountries] = useState()
  const [countriesData, setCountriesData] = useState([])

  const [error, setError] = useState({ common: "" });
  let dt = new Date();


  let startdate = new Date();
  let subcategories = []
  useEffect(() => {
    /**
     * Edit data using url query
     */



    if (
      props.match.params.id &&
      props.match.params.id !== 0 &&
      props.match.params.id !== "0"
    ) {
      console.log("prossssssssp param sid-----", props.match.params.id);
      query._id = props.match.params.id;
      setQuery(query);
    //   getAllCandidate(1, query);

    }


    /**
     * Edit data using  child component property
     */
    if (
      props.selectedId &&
      props.selectedId !== 0 &&
      props.selectedId !== "0"
    ) {
      query._id = props.selectedId;
      setQuery(query);
      getAllCandidate(1, query);
    }


    fetch("../../dist/assets/countries.json")
      .then((response) => response.json())
      .then((data) => {


        setCountriesData(data)

      });
  }, []);


  useEffect(() => {

    if (!candidate._id) {
      candidate.active_status = 1
    }

    let countrylist = [];
    let data = countriesData;

    // console.log('|||||||||||||||||||||||||||||', countriesData, candidate)

    let isFound = false;
    for (let i = 0; i < data.length; i++) {
      // console.log('>>>>>>>>>>>>>>>', candidate.nationality, data[i].name)
      if (candidate.nationality == data[i].name) {

        isFound = true;
        console.log('selected=================================================')
      }
      countrylist.push(
        <option value={data[i].value} test={isFound ? "true" : "false"} selected={candidate.nationality == data[i].name}>
          {data[i].name}
        </option>
      );

    }

    if (!isFound) {

      countrylist.unshift(<option selected={"true"}>Select Nationality</option>);
    }

    setCountries(countrylist);





  }, [countriesData])

  useEffect(() => {
    // loadaddress()


    if (candidate.other_categories) {
      setother_categories(candidate.other_categories)


      candidate.other_categories.map((i) => {


        othercat.push(i._id)


      })
      delete candidate.other_categories
    }
  }, [candidate._id])



  const loadaddress = async () => {


    const res = candidate.postcode.replace(/ /g, '')

    if (valid_postcode(res)) {


      let posstcodeurl = `https://api.getaddress.io/find/${res}?api-key=2e7S9RGIYky4CB5JjXD-yQ36009`;

      let response = await fetch(posstcodeurl);
      response = await response.json();

      if (response && response.latitude && response.longitude) {
        // results geometry location
        let addresses_rows = [];
        let regex = /\s+,/g;
        let newarray = response.addresses[0].split(',')
        console.log(newarray[5], "city")
        console.log(newarray[6], "county")

        for (let s = 0; s < response.addresses.length; s++) {
          addresses_rows.push(
            <option>{response.addresses[s].replace(regex, " ")}</option>
          );

        }
        setPostcodeObject({
          isValied: true,
          addresses: addresses_rows
        })

        console.log(newarray[5], "cityyy")
        console.log(newarray[6], "countyyy", response.latitude, "yyy", response.longitude)

        setCandidate({
          ...candidate,
          lat: response.latitude,
          long: response.longitude,
          county: newarray[6],
          city: newarray[5],
          postcode: candidate.postcode

        });

      }
    }
  }

  console.log("othercategories", other_categories)

  const deactivatereasonChange = (event) => {
    const { name, value } = event.target
    setCandidate({
      ...candidate,
      [name]: value,
    })
  }

  const hideError = () => {
    setTimeout(() => {
      setError({ common: "" });
    }, 10000);
  };
  console.log("startdate", startdate)

  const selectedcategory = (selectedOption, event) => {
    console.log("selectedoption", selectedOption);
    let name = event.name;


    let SelectedValues = [];
    console.log(selectedOption, "----selectedOption----");

    for (let i = 0; i < selectedOption.length; i++) {
      // let obj = {
      //   value: selectedOption[i].label,
      //   _id: selectedOption[i].value,


      // };
      if (selectedOption[i].value != candidate.category) {

        let obj = selectedOption[i].value
        SelectedValues.push(obj);

        console.log(SelectedValues, "--111--selectedOption----");
        setCandidate(
          (prevState) => ({
            ...prevState,
            [name]: SelectedValues
          })

        );


      }
    }


  };




  /**
   * Get all candidates
   * */
  const getAllCandidate = (pageNo, queryTemp) => {
    let queryNew = queryTemp ? queryTemp : query;
    queryNew.pageVo.pageNo = pageNo;
    setQuery(query);
    setIsLoading(true);
    const { dispatch } = props;

    queryNew.is_candidate_with_docs = true
    dispatch(candidateActions.candidateList(queryNew)).then(
      (res) => {
        setIsLoading(false);

        if (
          res &&
          res.data &&
          res.data.rows &&
          res.data.rows &&
          res.data.rows.length > 0
        ) {
          if (!res.data.rows[0].active_status) {
            res.data.rows[0].active_status = 1
          }

          setCandidate(res.data.rows[0]);
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const getuploadresponse = (response) => {
    if (response && response.file_name) {
      setCandidate((prevState) => ({
        ...prevState,
        profileimage: response.file_name,
      }));
    }


    setshowmodalfileupload(false)
    // location.reload()
  };

  //-------get all categories for select drop doen----

  const getAllcategories = () => {
    const { dispatch } = props;
    dispatch(categoryActions.categoryList(query)).then((res) => {
      // console.log(res.data.rows, "categories response ----");
      // setcategories(res.data.rows);
      let categoryData = res.data.rows;

      let categorylist = [];
      for (let i = 0; i < categoryData.length; i++) {
        categorylist.push(
          <option value={categoryData[i]._id}>{categoryData[i].name}</option>
        );
      }

      setcategoriesrows(categorylist);
    });
  };

  const handleChange = (event) => {
    setError({ common: "" });

    const { name, value } = event.target;
    if (name == "category") {
      category = event.target.value

    }
    if (name == "contact_number" && value.length > 11) {
      return;
    }

    //---accept only valid price---

    if (
      name == "morning_price" ||
      name == "night_price" ||
      name == "day_price" ||
      name == "evening_price" ||
      name == "weekend_day_price" ||
      name == "weekend_night_price"
    ) {
      if (value == "-" || value < 0 || value == "0") {
        return;
      }
    }

    setCandidate({
      ...candidate,
      [name]: value,
    });
  };

  console.log("cccccccccccccc", category)
  const handleChangepostcode = async (event) => {



    event.preventDefault();
    let { name, value } = event.target;
    // value = value.replace(/[^\w\s]/gi, '')

    let post_code = value.replace(/ /g, '');

    setCandidate({
      ...candidate,
      [name]: post_code
    });

    setPostcodeObject({
      isValied: false,
      addresses: []
    })

    if (valid_postcode(value)) {


      let posstcodeurl = `https://api.getaddress.io/find/${value}?api-key=2e7S9RGIYky4CB5JjXD-yQ36009`;




      let response = await fetch(posstcodeurl);
      response = await response.json();

      if (response && response.latitude && response.longitude) {
        // results geometry location

        let newarray = response.addresses[0].split(',')
        console.log(newarray[5], "city")
        console.log(newarray[6], "county")
        let regex = /\s+,/g;
        // let result = myString.replace(regex, "");

        let addresses_rows = [];
        for (let s = 0; s < response.addresses.length; s++) {



          addresses_rows.push(
            <option >{response.addresses[s].replace(regex, "")}</option>
          );
        }

        setPostcodeObject({
          isValied: true,
          // addresses: response.addresses
          addresses: addresses_rows
        })
        setCandidate({
          ...candidate,
          lat: response.latitude,
          long: response.longitude,
          county: newarray[6],
          city: newarray[5],
          postcode: post_code

        });


      }

    }
  }
  console.log(PostcodeObject.addresses, "postcode detailssssss========")
  console.log(candidate, "this is candidate statee-----");

  const onValueChange = (event) => {
    setCandidate({
      ...candidate,
      active_status: event.target.value,
    });
  };

  const onFileChange = (event) => {
    const { dispatch } = props;
    setisFileUpload(true);
    let name = "";
    if (candidate && candidate.other_documents) {
      event.target.name = candidate.other_documents;
    } else {
      name = event.target.name;
    }

    const value = event.target.files[0];

    dispatch(
      miscActions.fileupload(
        event.target.files[0],
        event.target.files[0].name,
        event.target.name,
        query,
        true
      )
    ).then((res) => {
      setisFileUpload(true);

      if (res) {
        setisFileUpload(false);

        setcandidateupload((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      setisFileUpload(false);
    });
  };
  const onSelectNationality = (event, contry) => {

    setCandidate({
      ...candidate,
      nationality: event.label,

    })

  }

  const valid_postcode = (str_postcode) => {
    let postcode = str_postcode.toUpperCase()
    postcode = postcode.toString().replace(/\s/g, "");

    var regex =
      /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
    return regex.test(postcode);
  };

  const valid_contact_number = (phone_number) => {
    phone_number = phone_number.toString().replace(/\s/g, "");

    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phone_number);
  };

  const handleSubmit = (event) => {
    setSubmitted(true);
    setDisabled(true)
    event.preventDefault();

    const { dispatch } = props;
    if (
      candidate.name &&
      candidate.ni_number &&
      candidate.address &&
      candidate.experience &&

      candidate.contact_number &&
      candidate.email &&
      candidate.working_limit &&
      candidate.postcode &&
      candidate.gender &&
      candidate.vaccination_status &&
      candidate.night_price &&
      candidate.day_price &&
      candidate.weekend_day_price &&
      candidate.weekend_night_price &&
      candidate.morning_price &&
      candidate.dob&&
      candidate.ethncity
    ) {
      if (
        candidate.night_price <= 0 ||
        candidate.day_price <= 0 ||
        candidate.weekend_price <= 0
      ) {
        setError({ common: "Enter a valid price" });
        setDisabled(false)

        return;
      }
      // setIsLoading(true);

      let postcode = valid_postcode(candidate.postcode);
      if (postcode == false) {
        setError({ common: "postcode not valid" });
        setDisabled(false)
        return;
      }

      let contact_number = valid_contact_number(candidate.contact_number);

      if (contact_number == false) {
        setError({ common: "Phone number not valid" });
        setDisabled(false)
        return;
      }

      if (candidate.dob) {

        if (candidate.dob > currentdate) {

          setError({ common: "Choose a valid date of birth" });
          setDisabled(false)
          return;
        }
      }
      if (rating) {
        candidate.staff_rating = rating
      }

      if (!candidate.other_categories && othercat) {
        candidate.other_categories = othercat
      }


      dispatch(candidateActions.candidateAdd(candidate)).then(
        () => {
          // props.history.goBack();
          history.push("/candidateslist");
          // location.reload()

          setIsLoading(false);
        },
        (err) => {
          console.log(err);
          setError({
            common: err && err ? err : alertConstants.SERVER_ERROR,
          });
          hideError();
          setIsLoading(false);
          setDisabled(false)
        }
      );
    } else {
      setError({ common: "Please complete the form!" });
      setDisabled(false)
    }
  };

  const showfileupload = () => {
    setshowmodalfileupload(true);
  };

  const hidefileupload = () => {
    setshowmodalfileupload(false);
  };
  return (
    <div className="CandidateAdd d-flex justify-content-center">
      <div className="col-md-10 col-md-offset-2">
        {isLoading && <LoadingModal />}

        <div className="card ">
          <div className=" page-header ">
            <div className="page-title-content">
              <p className="card-title">
                {candidate && candidate._id ? "Update" : "Add"} Candidate{" "}
              </p>
            </div>
          </div>
          <div className="card-body">
            <form name="form">

              <div className="row">
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.ni_number ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">NI Number / Reference Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ni_number"
                      placeholder=""
                      value={candidate.ni_number}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.ni_number && (
                      <div className="help-block">NI Number is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.name ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      name="name"
                      placeholder=""
                      value={candidate.name}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.name && (
                      <div className="help-block">Name is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-1">
                  <div className={"form-group "}>
                    <label htmlFor="type">Postcode</label>
                    <input
                      type="postcode"
                      className="form-control"
                      name="postcode"
                      placeholder="postcode "
                      value={candidate.postcode}
                      onChange={handleChangepostcode}
                    />
                    {/*Required*/}
                    {submitted && !candidate.postcode && (
                      <div className="help-block">postcode is required</div>
                    )}
                  </div>
                </div>


                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Visa type</label>
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.visatype ? " has-error" : "")
                    }
                  >
                    <select
                      className="select col-md-12 selectdesign"
                      name="visatype"
                      value={candidate.visatype}
                      onChange={handleChange}
                    >
                      <option value="" disabled> select</option>
                      <option value={"Student"}>Student</option>
                      <option value={"Citizen"}>Citizen</option>
                      <option value={"PR"}>PR</option>
                      <option value={"Dependant"}>Dependant</option>
                      <option value={"Skill Worker"}>Skill Worker</option>
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.visatype && (
                      <div className="help-block">Visa type is required</div>
                    )}
                  </div>
                </div>


              </div>


              <label htmlFor="type">Address</label>
              <div className="row">
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.address ? " has-error" : "")
                    }
                  >
                    {/* <label htmlFor="type">Address</label> */}
                    <select
                      className="form-control"
                      name="address"
                      placeholder="select address"
                      value={candidate.address}
                      onChange={handleChange}
                    >
                      <option value={''}>select address</option>
                      {PostcodeObject.addresses}
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.address && (
                      <div className="help-block">address is required</div>
                    )}

                  </div>
                </div>
                {/* </div><div className="row"> */}
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group "
                      // +
                      // (submitted && !candidate.address_line2
                      //   ? " has-error"
                      //   : "")
                    }
                  >
                    <input
                      className="form-control"
                      name="address_line2"
                      placeholder="Address line 2"
                      value={candidate.address_line2}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {/* {submitted && !candidate.address_line2 && (
                      <div className="help-block">
                        Address line2 is required
                      </div>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Gender</label>
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.gender ? " has-error" : "")
                    }
                  >
                    <select
                      className="select col-md-12 selectdesign"
                      name="gender"
                      value={candidate.gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled> select</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.gender && (
                      <div className="help-block">Gender is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Working limit</label>
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.working_limit
                        ? " has-error"
                        : "")
                    }
                  >
                    <select
                      className="select col-md-12 selectdesign"
                      name="working_limit"
                      value={candidate.working_limit}
                      onChange={handleChange}
                    >
                      <option value="" disabled> select</option>
                      <option value={"full time"}>Full time</option>
                      <option value={"part time"}>Part time</option>
                      <option value={"student part time"}>Student term time</option>
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.working_limit && (
                      <div className="help-block">
                        Working Limit is required
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.email ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder=""
                      value={candidate.email}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.email && (
                      <div className="help-block">Email is required</div>
                    )}
                  </div>
                </div>
                {/* </div><div className="row"> */}
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.contact_number
                        ? " has-error"
                        : "")
                    }
                  >
                    <label htmlFor="type">Mobile</label>
                    <input
                      type="number" step="any"
                      className="form-control"
                      name="contact_number"
                      placeholder=""
                      value={candidate.contact_number}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.contact_number && (
                      <div className="help-block">
                        Contact Number is required
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Experience</label>
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.experience ? " has-error" : "")
                    }
                  >
                    <select
                      className="select col-md-12 selectdesign"
                      name="experience"
                      value={candidate.experience}
                      onChange={handleChange}
                    >
                      <option value="" disabled> select</option>
                      <option value={"4 month"}>4 month</option>
                      <option value={"6 month"}>6 month</option>
                      <option value={"8 month"}>8 month</option>
                      <option value={"1 year"}>1 year</option>
                      <option value={"2 year"}>2 year</option>
                      <option value={"3 year"}>3 year</option>
                      <option value={"4 year"}>4 year</option>
                      <option value={"morethan 4 year"}>Morethan 4 year</option>
                      {/* <option value={""}></option> */}
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.experience && (
                      <div className="help-block">Experience is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Category</label>
                  <div className={"" + (submitted && !candidate.category ? " has-error" : "")}>

                    <select
                      className="select col-md-12 selectdesign"
                      name="category"
                      value={candidate.category}
                      onChange={handleChange}>
                      <option value="" disabled> select</option>
                      {categoriesrows}
                    </select>
                    {submitted && !candidate.category && (
                      <div className="help-block">Category is required</div>
                    )}
                  </div>
                </div>
              </div>
              {candidate.category && <div className="row">
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Other Categories</label>
                  <div
                  // className={
                  //   "" +
                  //   (submitted && !candidate.other_categories ? " has-error" : "")
                  // }
                  >

                    {candidate._id && isEditcategory && <AsyncSelect
                      //  className="async-select-custom"
                      name="other_categories"
                      onChange={selectedcategory}
                      // placeholder={"select businessunit"}
                      // value={candidate.category}
                      cacheOptions
                      defaultOptions
                      defaultInputValue={candidate && candidate["Category.name"] && candidate["Category.name"]}

                      isMulti
                      loadOptions={getcategorylist}
                    />}
                    {(!candidate._id && !isEditcategory) &&
                      <AsyncSelect
                        //  className="async-select-custom"
                        name="other_categories"
                        onChange={selectedcategory}
                        // placeholder={"select businessunit"}
                        // value={candidate.category}
                        cacheOptions
                        defaultOptions
                        isMulti
                        defaultInputValue={candidate && candidate["Category.name"] && candidate["Category.name"]}
                        loadOptions={getcategorylist}
                      />}
                    {candidate._id && !isEditcategory &&
                      <div className="col">
                        <div className="row">
                          <div className=" col-md-10 select_box1"> {other_categories.map((i) => { subcategories.push(i.name + " ," + " ") })}<p>{subcategories}</p></div>
                          <div className="edit_text" onClick={() => { setisEditcategory(true) }}>Edit</div>
                        </div>
                      </div>
                    }

                    {/*Required*/}
                    {/* {submitted && !candidate.other_categories && (
                      <div className="help-block">Category is required</div>
                    )} */}
                  </div>
                </div>
              </div>
              }
              {/* ---------age and nationality -------- */}

              <div className="row">
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.dob ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">DOB</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"

                      max={startdate}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder="DOB"
                      value={candidate.dob}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.dob && (
                      <div className="help-block">DOB is required</div>
                    )}
                  </div>
                </div>
                {/* </div><div className="row"> */}
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.nationality ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">Nationality</label>

                    <select
                      className="select col-md-12 selectdesign"
                      name="nationality"

                      onChange={handleChange}
                    >
                      {/* <option value="" disabled> select nationality</option> */}
                      {countries}
                    </select>


                    {submitted && !candidate.nationality && (
                      <div className="help-block">Nationality is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-1">
                  <label htmlFor="type">Select Ethnicity</label>
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.ethncity ? " has-error" : "")
                    }
                  >
                    <select
                      className="select col-md-12 selectdesign"
                      name="ethncity"
                      value={candidate.ethncity}
                      onChange={handleChange}
                    >
                      <option value="" disabled> Select Ethncity</option>
                      <option value={"Asian / Asian British"}>Asian / Asian British</option>
                      <option value={"Black / African / Caribbean / Black British"}>Black / African / Caribbean / Black British</option>
                      <option value={"Mixed / Multiple ethnic group"}>Mixed / Multiple ethnic group</option>
                      <option value={"Other ethnic group"}>Other ethnic group</option>
                      <option value={"White"}>White</option>
                      
                     
                    </select>
                    {/*Required*/}
                    {submitted && !candidate.ethncity && (
                      <div className="help-block">Ethncity is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="boldtext">Price</h5>
              </div>

              <div className="row">

                <div className="col-md-2 pr-1">
                  <div
                    className={"form-group " + (submitted && !candidate.morning_price ? " has-error" : "")}>
                    <label htmlFor="type">Morning </label>
                    <input
                      type="number" step="any"
                      className="form-control"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      name="morning_price"
                      placeholder=""
                      value={candidate.morning_price}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.morning_price && (
                      <div className="help-block">Moring price is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-2 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.day_price
                        ? " has-error"
                        : "")
                    }
                  >
                    <label htmlFor="type">Day </label>
                    <input
                      type="number" step="any"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      className="form-control"
                      name="day_price"
                      placeholder=""
                      value={candidate.day_price}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.day_price && (
                      <div className="help-block">
                        Day price is required
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-2 pr-1">


                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.night_price ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">Night </label>
                    <input
                      type="number" step="any"
                      className="form-control"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      name="night_price"
                      placeholder=""
                      value={candidate.night_price}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.night_price && (
                      <div className="help-block">Night_price is required</div>
                    )}
                  </div>
                </div>
                {/* </div><div className="row"> */}


                <div className="col-md-2 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.weekend_day_price
                        ? " has-error"
                        : "")
                    }
                  >
                    <label htmlFor="type">Weekend  day</label>
                    <input
                      type="number" step="any"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      className="form-control"
                      name="weekend_day_price"
                      placeholder=""
                      value={candidate.weekend_day_price}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.weekend_day_price && (
                      <div className="help-block">
                        Weekend day price is required
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-2 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.weekend_night_price
                        ? " has-error"
                        : "")
                    }
                  >
                    <label htmlFor="type">Weekend night </label>
                    <input
                      type="number" step="any"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      className="form-control"
                      name="weekend_night_price"
                      placeholder=""
                      value={candidate.weekend_night_price}
                      onChange={handleChange}
                    />
                    {/*Required*/}
                    {submitted && !candidate.weekend_night_price && (
                      <div className="help-block">
                        Weekend price is required
                      </div>
                    )}
                  </div>
                </div>



              </div>

              <div className="row">
                <div className="col-md-12 pr-1">
                  <div
                    className={"form-group "}
                  >
                    <label htmlFor="type">About</label>
                    <textarea
                      name="about"
                      className="form-control"
                      placeholder=""
                      value={candidate.about}
                      onChange={handleChange}
                      rows="4"
                      cols="50"
                    ></textarea>


                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 pr-1">
                  <div className={"form-group "}>
                    <label htmlFor="type" style={{ marginRight: "20px" }}>
                      Status
                    </label>

                    <label style={{ marginRight: "20px" }}>
                      <input
                        style={{ marginRight: "5px" }}
                        type="radio"
                        value={1}
                        checked={candidate.active_status == 1}
                      // onChange={onValueChange}
                      />
                      Active
                    </label>
                    {/* <label style={{ marginRight: "20px" }}>
                      <input
                        style={{ marginRight: "5px" }}
                        type="radio"
                        value={0}
                        checked={candidate.active_status == 0}
                        onChange={onValueChange}
                      />
                      Deactive
                    </label> */}

                  </div>
                </div>
              </div>
              {candidate.active_status == 0 && <div className="row">
                <div className="col-md-12 pr-1">
                  <div className={"form-group "}>
                    {/* <small>* Select reason for deactivate </small> */}
                    <label htmlFor="type"> Select reason for deactivate</label>
                    <select className="select col-md-12 selectdesign"
                      name="deactive_reason"
                      value={candidate.deactive_reason}
                      onChange={deactivatereasonChange}                                                >
                      <option value={""}>Select</option>
                      <option value={"Accidentally added shift"}>Temporary deactivate </option>
                      <option value={"Emergency cancellation"}>Emergency deactivate</option>
                      <option value="Other"> Other</option>
                    </select>
                  </div>
                </div>
              </div>}

              <div className="row">
                <div className="col-md-6 pr-1">
                  <div className={"form-group " + (submitted && !candidate.vaccination_status ? " has-error" : "")}>
                    <label htmlFor="type">Are you Vaccinated</label>
                    <select className="select col-md-12 selectdesign"
                      name="vaccination_status"
                      value={candidate.vaccination_status}
                      onChange={handleChange}>
                      <option value="" disabled> select</option>
                      <option value={"First Dose"}>
                        First Dose
                      </option>
                      <option value={"Second Dose"}>
                        Second Dose
                      </option>
                      <option value={"Partially Vaccinated"}>
                        Partially Vaccinated
                      </option>
                      <option value={"Fully Vaccinated"}>
                        Fully Vaccinated
                      </option>
                      <option value={"Not Vaccinated"}>Not Vaccinated</option>
                      {/* <option value={""}></option> */}
                    </select>

                    {/*Required*/}
                    {submitted && !candidate.vaccination_status && (
                      <div className="help-block">
                        vaccination_status is required
                      </div>
                    )}
                  </div>
                </div>
                {/* //----------ni hours start -------- */}
                <div className="col-md-6 pr-1">
                  <div
                    className={
                      "form-group " +
                      (submitted && !candidate.nationality ? " has-error" : "")
                    }
                  >
                    <label htmlFor="type">Ni Hour</label>
                    <input
                      type="number"
                      step="any"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      className="form-control"
                      name="ni_hour"
                      placeholder=""
                      value={candidate.ni_hour}
                      onChange={handleChange}
                    />



                    {/* {submitted && !candidate.nationality && (
                      <div className="help-block">Nationality is required</div>
                    )} */}
                  </div>
                </div>
              </div>

              {/* //------response status --------- */}
              <div className="row">


                <div className="col-md-6 pr-1">
                  <div className={"form-group " + (submitted && !candidate.service_type ? " has-error" : "")}>
                    <label htmlFor="type">Service Type</label>
                    <select className="select col-md-12 selectdesign"
                      name="service_type"
                      value={candidate.service_type}
                      onChange={handleChange}>
                      <option value="" disabled> select</option>
                      <option value={"Hospitality"}>
                        Hospitality
                      </option>
                      <option value={"Health Care"}>
                        Health Care
                      </option>

                      {/* <option value={""}></option> */}
                    </select>

                    {/*Required*/}
                    {/* {submitted && !candidate.service_type && (
                      <div className="help-block">
                        service_type is required
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="col-md-6 pr-1">
                  <div className={"form-group " + (submitted && !candidate.response_status ? " has-error" : "")}>
                    <label htmlFor="type">Response status</label>
                    <input
                      type="text"

                      className="form-control"
                      name="response_status"
                      placeholder=""
                      value={candidate.response_status}
                      onChange={handleChange}
                    />

                    {/*Required*/}
                    {/* {submitted && !candidate.vaccination_status && (
                      <div className="help-block">
                        vaccination_status is required
                      </div>
                    )} */}
                  </div>
                </div>

              </div>







              <div className="row">
                <div className="col-md-12 ">
                  <div className={"form-group mb-4"}>
                    <label htmlFor="type">Upload Profile image</label>
                    <div className="d-flex">
                      <div className="col-md-8 d-flex justify-content-between align-items-center filenames">
                        <div>
                          {candidate && candidate.profileimage
                            ? candidate.profileimage
                            : "no image uploaded"}
                        </div>
                        <div className="float-right">
                          {" "}
                          <div
                            className="changebutton m-2 p-3"
                            onClick={showfileupload}
                          >
                            Change
                          </div>
                        </div>
                      </div>
                      <div style={{
                        marginLeft: "10px",
                        marginTop: "10px"
                      }}>{candidate && candidate.profileimage ? <img
                        className=' round-emp-image'
                        src={apiConstants.imgUrl + candidate.profileimage}


                      /> :
                        <img
                          className=' round-emp-image'
                          src="/dist/assets/img/flexi_rhino2.png"
                        />}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="d-flex" >
                  <div><img
                    className='star-image'
                    src="/dist/assets/img/star.png"
                  /></div>
                  <div className="font-weight-bold d-flex" style={{ cursor: "pointer" }}
                    onClick={() => { setaddratingmodal(true) }}>

                    <label htmlFor="type">rating</label>
                  </div>

                  {!candidate.staff_rating && <div className="font-weight-bold d-flex"
                    style={{ cursor: "pointer", color: "blue", marginLeft: "20px" }}
                    onClick={() => { setaddratingmodal(true) }}>

                    <label htmlFor="type">Add</label>
                  </div>}
                  {candidate.staff_rating && <div className="font-weight-bold d-flex"
                    style={{ cursor: "pointer", color: "blue", marginLeft: "20px" }}
                    onClick={() => { setaddratingmodal(true) }}>

                    <label htmlFor="type">Edit</label>
                  </div>}
                </div>
              </div>


              <div className="row">
                <div className="col-md-12 pr-1">
                  <span className="color-red">{error.common}</span>
                  <div className="form-group">
                    <button disabled={Disabled} onClick={handleSubmit} className="btn bluebutton pl-2 pr-2" >
                      {candidate && candidate._id ? "Update" : "Add"} Candidate
                      {props.requestStatus ===
                        reducerConstants.CANDIDATE_REQUEST && (
                          <div class="lds-ring ml-2">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer" />
        </div>
      </div >


    </div>

  );
};

const getcategorylist = (category) =>
  new Promise((resolve, reject) => {
    console.log("lllll", category)
    fetch(apiConstants.apiUrl + "/getcategoryList", {
      method: "post",
      headers: authHeader(),
      // body: JSON.stringify({ searchKey: inputValue,category:['Water purifier','Water treatment plan']}),
      body: JSON.stringify({ status: 1 }),
    })
      .then((response) =>
        response
          .json()

          .then(({ data }) => {

            // for(let j=0 ;j<data.rows.length;j++){
            //   if(data.rows[j] == category){
            //     delete data.rows[j]
            //   }
            // }

            resolve(
              data.rows.filter(id => id._id != category).map(({ _id, name }) => ({
                value: _id,
                label: name,
              }))
            );
            console.log("sdsdssdsds", data);
          })
      )
      .catch(reject);
  });


function mapStateToProps(state) {
//   const { requestStatus, candidateData } = state.candidate;
  return {
    // requestStatus,
    // candidateData,
  };
}

const connectedResumeAdd = connect(mapStateToProps)(ResumeAdd);
export { connectedResumeAdd as ResumeAdd };

