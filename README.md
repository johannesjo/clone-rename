# clone-rename-refactor
=======================
Little  commandline script to clone a directory and rename all files and folders with a certain pattern as well as all variable names in it.

## Example
``` 
npm i clone-rename-refactor
clone-rename ./some-folder jira open-project
```

Gives the following output:
```
_______________CLONE_RENAME_______________
In dir:  ./some-folder
Input      jira => open-project
-------------------------------------------
replaces inside file names  jira => open-project
replaces inside file contents  Jira => OpenProject
replaces inside file contents  jira => openProject
replaces inside file contents  JIRA => OPEN_PROJECT
replaces inside file contents  jira => open-project
```


## Module duplication and renaming example
The module was build with the following case (or similar in mind).

#### Files:
```
/some-named-module
  /some-named-module-sub-component
    some-named-module-sub-component.component.ts
    some-named-module-sub-component.component.html
  some-named-module.ts
...(and so on)
```

==> Which becomes:
```
/another-title-module
  /another-title-module-sub-component
    another-title-module-sub-component.component.ts
    another-title-module-sub-component.component.html
  another-title-module.ts
...(and so on)
```

#### File contents: 
```TypeScript
@Component({
  selector: 'dialog-some-named-initial-setup',
  templateUrl: './dialog-some-named-initial-setup.component.html',
  styleUrls: ['./dialog-some-named-initial-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSomeNamedInitialSetupComponent {
  someNamedCfg: SomeNamedCfg = DEFAULT_SOME_NAMED_CFG;
  formConfig = SOME_CONFIG_FORM;

  constructor(
    private _matDialogRef: MatDialogRef<DialogSomeNamedInitialSetupComponent>,
  ) {
  }

  saveSomeNamedCfg(someNamedCfg: SomeNamedCfg): void {
    this._matDialogRef.close(someNamedCfg);
  }
}
```
==> Which becomes:
```TypeScript
@Component({
  selector: 'dialog-another-title-initial-setup',
  templateUrl: './dialog-another-title-initial-setup.component.html',
  styleUrls: ['./dialog-another-title-initial-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnotherTitleInitialSetupComponent {
  anotherTitleCfg: AnotherTitleCfg = DEFAULT_ANOTHER_TITLE_CFG;
  formConfig = SOME_CONFIG_FORM;

  constructor(
    private _matDialogRef: MatDialogRef<DialogAnotherTitleInitialSetupComponent>,
  ) {
  }

  saveAnotherTitleCfg(anotherTitleCfg: AnotherTitleCfg): void {
    this._matDialogRef.close(anotherTitleCfg);
  }
}
```
