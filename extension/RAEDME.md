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
 2. [ ] force users to input variables defined in `hypothesis`
 3. [ ] clear up the pipeline between variables and hypothesis
    * [ ] introduce dictionaries for varirables to avoid deplicates
    * [ ] generate hypothesis text based on the dv variable type