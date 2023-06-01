import ApiFunctions from "./ApiService";

const getQuestions = async (params) => {
  const result = await ApiFunctions.GetQuestions(params);
  return result;
};

const getSubjects = async () => {
  const result = await ApiFunctions.GetSubjects();
  return result;
};

const getTurns = async () => {
  const result = await ApiFunctions.GetTurns();
  return result;
};

const getUnits = async () => {
  const result = await ApiFunctions.GetUnits();
  return result;
};

const addQuestion = async (obj) => {
  const result = await ApiFunctions.AddQuestion(obj);
  return result;
};

const updateQuestion = async (obj, id) => {
  const result = await ApiFunctions.UpdateQuestion(obj, id);
  return result;
};

const deleteQuestion = async (id) => {
  const result = await ApiFunctions.DeleteQuestion(id);
  return result;
};

AppFunctions = {
  GetQuestions: getQuestions,
  GetSubjects: getSubjects,
  GetTurns: getTurns,
  GetUnits: getUnits,
  AddQuestion: addQuestion,
  UpdateQuestion: updateQuestion,
  DeleteQuestion: deleteQuestion,
};

export default AppFunctions;
