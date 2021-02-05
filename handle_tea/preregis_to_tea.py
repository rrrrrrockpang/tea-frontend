import logging
import tea
import sys
import ast
from io import StringIO

def process_to_tea(study_type, independent_variables, dependent_variables, hypothesis):
    # hard code. wait for Eunice's revision.
    data_path = "http://127.0.0.1:5000/data/df.csv"
    tea.data(data_path)

    variables = independent_variables.copy()
    variables.extend(dependent_variables)

    logging.warning("Debugging Variable")
    logging.warning(variables)
    tea.define_variables(variables)

    study_design = {
        'study type': study_type,
        'independent variables': [v['name'] for v in independent_variables],
        'dependent variables': [v['name'] for v in dependent_variables]
    }

    logging.warning("Debugging Study Design")
    logging.warning(study_design)

    tea.define_study_design(study_design)

    assumptions = {
        'Type I (False Positive) Error Rate': 0.05
    }

    logging.warning("Debugging Assumptions")
    logging.warning(assumptions)

    tea.assume(assumptions)

    lst = hypothesis.split("], [")
    lst[0] = ast.literal_eval(lst[0] + "]")
    lst[1] = ast.literal_eval("[" + lst[1])

    logging.warning("Debugging Hypothesis")
    logging.warning(lst)

    tea.hypothesize(lst[0], lst[1])

    result = StringIO()
    sys.stdout = result
    result_string = result.getvalue()
    logging.warning("This is the result")
    logging.warning(result_string)
    return """Results:
--------------
Test: mannwhitney_u
***Test assumptions:
Exactly one explanatory variable: condition
Exactly one explained variable: wtp_final
Independent (not paired) observations: condition
Variable is categorical: condition
Variable has two categories: condition
Continuous OR ORDINAL (not nominal) data: wtp_final

***Test results:
name = Mann Whitney U Test
test_statistic = 68.00000
p_value = 0.17907
adjusted_p_value = 0.17907
alpha = 0.05
dof = 10
Effect size:
A12 = 0.61818
Null hypothesis = There is no difference in medians between condition = SE and condition = SD on wtp_final.
Interpretation = t(10) = 68.00000, p = 0.17907. Fail to reject the null hypothesis at alpha = 0.05. There is no difference in medians between condition = SE and condition = SD on wtp_final.The effect size is A12 = 0.61818. The effect size is the magnitude of the difference, which gives a holistic view of the re
sults [1].
[1] Sullivan, G. M., & Feinn, R. (2012). Using effect size—or why the P value is not enough. Journal of graduate medical education, 4(3), 279-282.

Test: kruskall_wallis
***Test assumptions:
Independent (not paired) observations: condition
Exactly one explanatory variable: condition
Exactly one explained variable: wtp_final
Continuous (not categorical) data: wtp_final
Variable is categorical: condition
Variable has two or more categories: condition

***Test results:
name = Kruskall Wallis
test_statistic = 0.91334
p_value = 0.33923
adjusted_p_value = 0.33923
alpha = 0.05
dof = 10
Null hypothesis = There is no difference in medians between condition = SE, SD on wtp_final.
Interpretation = t(10) = 0.91334, p = 0.33923. Fail to reject the null hypothesis at alpha = 0.05. There is no difference in medians between condition = SE, SD on wtp_final.
"""