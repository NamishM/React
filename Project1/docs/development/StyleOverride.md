# Airbnb Style Override

Overrides the default style guide set by [Airbnb](https://github.com/airbnb/javascript).
See the [contributing section](../../CONTRIBUTING.md) for styleguide info.

To configure see `.eslintrc.json`

## No underscore dangle

**Deactivated**

#### Resources

 - [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle)
 - [Airbnb Rule](http://airbnb.io/javascript/#naming--leading-underscore)

#### Justification

`_` is in such common use in the industry for demarkating
a private API that we have re-enabled this feature.
 While we agree that it does not prevent others from accessing
the private API, it does allow for unit testing (an issue not covered by
Airbnb in enforcing this rule).

Private APIs `_functionName` are not to be
used outside of the enclosing class/library. Anyone calling them externally
can expect them to change without notice.

## Function Params Comma Dangle

**Activated**

#### Resources

- [comma-dangle](http://eslint.org/docs/rules/comma-dangle)

#### Justification

Requiring a comma dangle for multiline declarative arrays & objects as well as
multiline parameters for function calls, allows the editing developer to make
1 line edit vs 2 (adding the comma on the previous line and adding the new
parameter). This aids code comparison & developers tools when diffing lines.

**Example**

```
// bad
function(
  param1
)
```

```
// good
function(
  param1,
)
```

## No Static Element Interaction

**Deacativated**

TODO: See if we can get this activated again.

#### Resources

- [jsx-a11y/no-static-element-interactions](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md)

#### Justification

We've already asigned various non-interactive elements clicks. Need to refactor
in order to reactivate.

## Label Has For

**Deacativated**

TODO: See if we can get this activated again.

#### Resources

- [jsx-a11y/label-has-for](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md)

#### Justification

We're using labels where they are not actually labels. Need to refactor in order
to reactivate this.

## No Unused PropTypes

**Deacativated**

TODO: See if we can get this activated again.

#### Resources

- [react/no-unused-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md)

#### Justification

We have react elements that pass properties through sub components via the [object spread operatior](https://github.com/sebmarkbage/ecmascript-rest-spread).
The object spread operator is not recodnized when passing parameters to sub-components.

```
  <Component {...prop} />
```

## Prefer Default Export

**Deacativated**

TODO: See if we can get this activated again.

#### Resources

- [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

#### Justification

TODO: Need to revisit why Deactivated...

## Imports First | absolute-first

**Deacativated**

#### Resources

Ensures that absolute paths are first.

#### Justification

This prevents organization imports logically. There is nothing inherently
better about absolute paths coming first. Also, does not handle the `srs`
namespace well.

## Prefer Default Export

**Deactivated**

TODO: See if we can get this activated again.

#### Resources

Ensures that props with isRequired are always assigned default properties

- [react/require-default-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)

#### Justification

This is a significant undertaking to upgrade our app to accommodate this rule.

## No Webpack Loader Syntax

**Deactivated**

#### Resources

Ensures we are not using webpack loading syntax within our .js/.jsx files

- [import/no-webpack-loader-syntax](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

#### Justification

We currently need to override webpack global settings in a few key places.
As it's quite complicated, to configure I don't imagine this becoming a significant issue in the future.

## No Restricted Syntax ForOfStatement

**Deactivated**

#### Resources

Disables ES6 iterators and generators since they are considered too heavy

- [no-restricted-syntax](http://eslint.org/docs/rules/no-restricted-syntax)
- [no-restricted-syntax airbnb config](https://github.com/airbnb/javascript/blob/74071a809c22fa1104fe5d86bcd1eda949e1d0d9/packages/eslint-config-airbnb-base/rules/style.js#L257)

#### Justification

We rely heavily on generators for our flow control. This problem will naturally go away in the future as browsers adopt the technology for generators natively.

## No Autofocus

**Deactivated**

#### Resources

Enforce that autoFocus prop is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

- [jsx-a11y/no-autofocus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md)
