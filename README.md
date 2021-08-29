# clone-rename-refactor
=======================
Little  commandline script to clone a directory and rename all files and folders with a certain pattern as well as all variable names in it.

## Example
``` 
npm i clone-rename-refactor
clone-rename ./src/app/features/issue/providers/open-project jira open-project
```

````
_______________CLONE_RENAME_______________
In dir:  ./src/app/features/issue/providers/open-project
Input      jira => open-project
-------------------------------------------
fileNames  jira => open-project
variables  Jira => OpenProject
variables  jira => openProject
variables  JIRA => OPEN_PROJECT
variables  jira => open-project
```
