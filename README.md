# React Async Script

In some cases you need to load a js file but you dont want to add it into your bundle.js,
and dont want to add it in html file too. You want it to be added when is needed.
So you can use this package ;))

# How it works

Assume that you want to add library `charting_library.min.js` & `charting_library_datafeeds_udf.min.js` into one of your react modules and you want it to be added when is needed.
So you can use this code :

```js
const requiredScripts = [
    "/js/charting_library/charting_library.min.js",
    "/js/charting_library/charting_library_datafeeds_udf.min.js"
];
export default InjectScripts(...requiredScripts)(MyReactComponent);
```

Or you can also use react component like :

```html
<ScriptInjection scriptUrl={"https://code.jquery.com/jquery-3.3.1.slim.min.js"}>
    <MyReactComponent/>
</ScriptInjection>
```

If you want to see a loading component when scripts are loading you can set `window.scriptLoadingComponent` :

```jsx harmony
class Loading extends React.Component {
    render() {
        return 'Scripts are Loading ...';
    }
}
window.scriptLoadingComponent = Loading;
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Also star my project in gitHub if you like it ;))
