const postRequest = async (study_type, dependentVarLst, independentVarLst, hypothesis) => {
  const setting = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'study_type': study_type,
      'dependent_variables': dependentVarLst,
      'independent_variables': independentVarLst,
      'hypothesis': hypothesis
    })
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/submit', setting);
    console.log(response.status);
    console.log(response.text);
    console.log(response.json());
    return response.json();
  } catch(e) {
    return e;
  }
};