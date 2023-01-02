import config from 'config';
import { authHeader, authHeaderMulti } from '../_helpers';

import { apiConstants } from '../_constants';

export const miscService = {
    countries,
    shorturl,
    fileupload,
    fileuploadContact,
    otpverification,
    texttovoice,
    voiceoptionlist,
    getdashbaorddata,
    getCompanyApiKey,
    uploadexcel,
    csvJSON,
    ConvertKeysToLowerCase,
    getUrlVars,
    b64toBlob,
    getAllActiveCountry,
    downloadinvoice,
    formatDate,
    formatTime
};


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(text);
        if (data.error_code !== 0) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.message;
            return Promise.reject(error);
        }
        return data;
    });
}

function logout() {
    localStorage.removeItem('user');
}

function fileupload(file, name) {
    console.log(file, name);
    let data = new FormData();
    data.append('file', file, name);
    data.append('name', 'filename');

    if (localStorage.getItem('selectedcompany')) {
        let company = JSON.parse(localStorage.getItem('selectedcompany'));
        data.append('companyid', company._id);

        // alert(company._id);
    }

    //let headers=authHeader();
    //  headers['Content-Type']='multipart/form-data';
    const requestOptions = {
        method: 'POST',
        body: data,
        headers: authHeaderMulti()
    };
    return fetch(apiConstants.apiUrl + '/uploadfileblob', requestOptions)

        .then(handleResponse);

}


function texttovoice(data) {

    //  let data = { text: text };

    if (localStorage.getItem('selectedcompany')) {
        let company = JSON.parse(localStorage.getItem('selectedcompany'));
        data.companyid = company._id;

        // alert(company._id);
    }


    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/texttovoice', requestOptions)

        .then(handleResponse);
}

function voiceoptionlist() {




    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(apiConstants.apiUrl + '/iapi/voices', requestOptions)

        .then(handleResponse);
}
function fileuploadContact(file, name) {
    console.log(file, name);
    let data = new FormData();
    data.append('file', file, name);
    data.append('name', "test");
    if (localStorage.getItem('selectedcompany')) {
        let company = JSON.parse(localStorage.getItem('selectedcompany'));
        data.append('companyid', company._id);

        // alert(company._id);
    }

    const requestOptions = {
        method: 'POST',
        body: data,
        headers: authHeader()
    };
    return fetch(apiConstants.apiUrl + '/uploadfileblobcontact', requestOptions)

        .then(handleResponse);

}
function uploadexcel(file, name) {
    console.log(file, name);
    let data = new FormData();
    data.append('file', file, name);
    data.append('name', 'filename');

    if (localStorage.getItem('selectedcompany')) {
        let company = JSON.parse(localStorage.getItem('selectedcompany'));
        data.append('companyid', company._id);

        // alert(company._id);
    }

    //let headers=authHeader();
    //  headers['Content-Type']='multipart/form-data';
    const requestOptions = {
        method: 'POST',
        body: data,
        headers: authHeaderMulti()
    };
    return fetch(apiConstants.apiUrl + '/uploadexcel', requestOptions)

        .then(handleResponse);

}



function countries() {
    const requestOptions = {
        method: 'GET'


    };

    return fetch(apiConstants.apiUrl + '/country.json', requestOptions)
        //.then(handleResponse)
        .then(country => country.json()).then(data => {
            console.log(data);
            return data
        })
}
function getAllActiveCountry(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/getcountryList', requestOptions).then(handleResponse);
}
function shorturl(stringurl) {
    console.log(stringurl);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: stringurl })
    };

    return fetch(' https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyB0UktWR7xDNvmpdvZfHMk2Lw4EjYvDtak', requestOptions)

        .then(data => {
            console.log(data);
            return data;

        });


}

function getCompanyApiKey(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/getCompanyApiKey', requestOptions).then(handleResponse);
}

function downloadinvoice(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/downloadinvoice', requestOptions).then(handleResponse);
}




function otpverification(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/otpverify', requestOptions).then(handleResponse);
}

function getdashbaorddata(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(apiConstants.apiUrl + '/iapi/getdashbaorddata', requestOptions).then(handleResponse);

}


//var csv is the CSV file with headers
function csvJSON(csv) {
    console.log(csv);

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}



function ConvertKeysToLowerCase(obj) {
    console.log(obj);
    if (obj instanceof Array) {
        for (var i in obj) {
            obj[i] = keysToLowerCase(obj[i]);
        }
    }
    if (!typeof (obj) === "object" || typeof (obj) === "string" || typeof (obj) === "number" || typeof (obj) === "boolean") {
        return obj;
    }
    var keys = Object.keys(obj);
    var n = keys.length;
    var lowKey;
    while (n--) {
        var key = keys[n];
        if (key === (lowKey = key.toLowerCase()))
            continue;
        obj[lowKey] = keysToLowerCase(obj[key]);
        delete obj[key];
    }
    return (obj);
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

function formatTime(date) {
    let d = new Date(date),
        hours = d.getHours(),
        minutes = '' + d.getMinutes(),
        a = ' AM';

    if (hours > 12) {
        hours = '' + hours - 12;
        a = ' PM';
    } else if (hours == 0) {
        hours = '12';
    } else {
        hours = '' + hours;
    }

    if (minutes.length < 2)
        minutes = '0' + minutes;

    return hours + ':' + minutes + a;
}