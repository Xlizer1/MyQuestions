import axios from "axios";
import APP_CONSTANTS from "../settings/constants";

const getQuestions = async (params) => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "questions";

    apiResult = await axios({
      url: url,
      method: "get",
      params: params,
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    return {
      fromAPI: false,
      status: false,
      data: error?.message,
      error: true,
      errorCode: 0,
    };
  }
};

const getSubjects = async () => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "subjects";

    apiResult = await axios({
      url: url,
      method: "get",
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    console.log(error?.message);
  }
};

const getTurns = async () => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "turns";

    apiResult = await axios({
      url: url,
      method: "get",
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    console.log(error?.message);
  }
};

const getUnits = async () => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "units";

    apiResult = await axios({
      url: url,
      method: "get",
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    console.log(error?.message);
  }
};

const addQuestion = async (obj) => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "questions/add";

    apiResult = await axios({
      url: url,
      method: "post",
      data: obj,
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    return {
      fromAPI: false,
      status: false,
      data: error?.message,
      error: true,
      errorCode: 0,
    };
  }
};

const updateQuestion = async (obj, id) => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "questions/" + id;

    apiResult = await axios({
      url: url,
      method: "put",
      params: obj,
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    return {
      fromAPI: false,
      status: false,
      data: error?.message,
      error: true,
      errorCode: 0,
    };
  }
};

const deleteQuestion = async (id) => {
  let apiResult = null;

  try {
    const Host = APP_CONSTANTS.Host;
    let url = Host + "questions/" + id;

    apiResult = await axios({
      url: url,
      method: "delete",
    });

    if (apiResult.data.status === true) {
      return {
        fromAPI: true,
        status: true,
        data: apiResult.data,
        error: false,
        errorCode: 0,
      };
    } else if (apiResult.data.status === false) {
      return { status: false, error: true, errorCode: 1 };
    }
  } catch (error) {
    return {
      fromAPI: false,
      status: false,
      data: error?.message,
      error: true,
      errorCode: 0,
    };
  }
};

ApiFunctions = {
  GetQuestions: getQuestions,
  GetSubjects: getSubjects,
  GetTurns: getTurns,
  GetUnits: getUnits,
  AddQuestion: addQuestion,
  UpdateQuestion: updateQuestion,
  DeleteQuestion: deleteQuestion,
};

export default ApiFunctions;
