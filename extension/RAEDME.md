1. Plugin loads
2. Users define construct.
   * The construct goes to define a variable
   * The variables goes to the dependent and independent variable lists. 
        1. So we need `construct` list 
3. Users define dependent variables
   * The dependent variables show the suggested list input in the `construct` list 
   * When users add the dependent variables. the variables deleted from the `construct` list
   * all keys are `variable_name`
   
   
   
   
 Goal today:
 1. [x] Introduce construct
 2. [x] have a recommended area
 3. [x] clear up the pipeline between variables and hypothesis
    * [x] introduce dictionaries for varirables to avoid deplicates
    * [x] generate hypothesis text based on the dv variable type
    * [ ] dictionary. key: var_name, value: variable object 
    * [ ] Improve performance above by avoiding going through the list. can implement later on
 4. [ ] functionality to edit variables
    * [ ] Must add at list two nominal groups
 5. [ ] handle nominal and ordinal
    * [ ] add ability to delete categories
    * [ ] check duplicate for categories    
 6. [ ] remove nominal for dependent variable
 7. [ ] analysisCondition switch to `variable` instead of `string`
 construct(construct_name: string, variable: Variable);

1. hypothesis: 
    1. add construct to construct_lst
    2. add variable to variable_lst


2. variable:
    1. check variable_lst
    2. mark variable.isSelected
    3. if isSelected
        * do not show in the recommended area
    4. if deleted in the display area
        * add back to the recommended area 