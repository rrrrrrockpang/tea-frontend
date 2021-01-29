import logging
import tea
import sys
from io import StringIO

def process_to_tea(study_type, independent_variables, dependent_variables, hypothesis):
    # hard code. wait for Eunice's revision.
    data_path = "http://127.0.0.1:5000/data/df.csv"
    tea.data(data_path)

    variables = independent_variables
    variables.extend(dependent_variables)
    logging.warning(variables)
    tea.define_variables(variables)

    study_design = {
        'study type': study_type,
        'independent variables': independent_variables,
        'dependent variables': dependent_variables
    }

    tea.define_study_design(study_design)

    assumptions = {
        'Type I (False Positive) Error Rate': 0.05
    }

    tea.assume(assumptions)

    logging.warning(hypothesis)
    tea.hypothesize(hypothesis)

    result = StringIO()
    sys.stdout = result
    result_string = result.getvalue()
    return result_string