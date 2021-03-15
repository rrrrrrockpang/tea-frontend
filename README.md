# tea-frontend

1. Get Tea

```
variables = [
    {
        'name': 'variable_1_name',
        'data type': 'nominal',
        'categories': ['CI', `PI`]  # if the `data type` is nominal, this field has to exist
    },
    {
        'name': 'variable_2_name',
        'data type': 'interval',
        'range': [0, 1]  # this can be optional. actually we don't really need it
    }
]

study_design = {
    'study type': 'observational study',
    'independent variable': 'variable_1_name',
    'dependent variable': 'variable_2_name'
}

assumptions = {
    'groups normally distributed': [['So', 'Prob']],
    'Type I (False Positive) Error Rate': 0.05
}

# if independent variable is nominal
hypothesis = "variable_1_name: CI > PI" # one-tail
# is independent variable is interval
hypothesis = "variable_2_name ~ variable_1_name"  +/-
```

Information needed from the json request:
```
{
    'variables': [
        {
            'name': string
            'data type': string 'nominal ordinal interval ratio'
            # categories depends on data type
            'categories": [] array
        }, 
        ...
    ],
    'independent variables': [{}, {}] // variables from above
    'dependent variables': [{}] // variables from above
    'hypothesis': {
        'dependent variable': {} # variable from above
        'independent variable': {} # from above
        'relationship': {
            'condition_type': nominal,
            'two-side': true/false,
            # if two-side == false
            'categories': [cat1, cat2]  # the bigger one is in the front
        } 
        # or if the dv type is not nominal
        {
            'condition_type': others,
            'positive': true/false
        }
    }
}
```


2. Conduct Power Analysis

```
{   
    "test": "t-test",
    "sample_size": [5, 70]
    "effect_size": [0.2, 0.5, 0.8]
    "alpha": 0.05
}
```

Return
```
    "effect_size": {
        0.2: {
            "powers": [..., ..., ...]
        },
    }
```