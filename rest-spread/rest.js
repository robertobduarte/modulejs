const {readFile} = require ('fs/promises')

/*
Utilizado para permitir que uma função receba um número indefinido de parâmetros
O operador rest é usado para colocar o restante de alguns valores específicos fornecidos pelo usuário em uma matriz JavaScript.
*/
function myBio(firstParams, lastParams, ...otherInfo) {
    console.log(`Na lista estão: ${firstParams}, ${lastParams}. Os demais são: ${otherInfo.join(', ')}.`)
  }
// Invoke myBio function while passing five arguments to its parameters:
myBio("Roberto", "Javascript", "CodeSweetly", "Web Developer", "Male");

const getFileContent = async(filePath) =>{
  return (await readFile(filePath)).toString()
}

const getBankOfQuestionsCycle = async (id) => {
  const bankOfQuestion = JSON.parse(await getFileContent('./bankOfQuestion.csv'));
  let bankOfProgramById = ""
  for (const bank of bankOfQuestion) {
    if(bank.id == id) bankOfProgramById = bank
  }
  return await bankOfProgramById;
}

//function IIFE - Immediately Invoked Function Expression
( getLastQuestionBanks = async() =>{
  const programs = JSON.parse(await getFileContent('./programs.csv'));
  const programsQuestions = [];

  for (const program of programs) {
    const volumesBankOfQuestions = await getBankOfQuestionsCycle(program.id);

    //const isAvailableBankOfQuestion = volumesBankOfQuestions.question.filter(e => e.available );
    const isAvailableBankOfQuestion = volumesBankOfQuestions.question.available;
    if(isAvailableBankOfQuestion) programsQuestions.push({...program, volumesBankOfQuestions});
  } 
  console.log(programsQuestions);
  })();