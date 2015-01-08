puredom-taginput
================
A [puredom](http://puredom.org) plugin that adds support for `<input type="tag">` to forms wrapped in [puredom.FormHandler](http://puredom.org/docs/symbols/puredom.FormHandler.html).  
It enhances input fields with an interactive list of tags, represented in field values as a comma-separated list.  

*To use taginput, add the CSS and JS files to your page:*  
```html
<link rel="stylesheet" type="text/css" href="puredom-taginput.css" />
<script src="puredom-taginput.js"></script>
```


---


Selection Methods
=================

`.taginput( {Boolean} enabled )`  
*Enable or disable tag-based editing for a field*  

`.removetaginput()`  
*The same as calling `.taginput(false)`*  

Selection Example
-----------------
```html
<!-- standard input field -->
<input id="myTags" value="Foo, Bar, Baz" />

<script>
	// To enable the tag input UI for that field:
	puredom('#myTags').taginput();

	// To disable it:
	puredom('#myTags').taginput(false);
</script>
```


---


Using With FormHandler
======================
If you're using [puredom.FormHandler](http://puredom.org/docs/symbols/puredom.FormHandler.html), all `<input type="tag">` fields will be automatically enhanced once you include the plugin.  

FormHandler Example
-------------------
```html
<form id="myForm">
	<input type="tag" value="No Shirt,No Shoes,No Service" />
</form>

<script>
	var form = new puredom.FormHandler('#myForm', {
		enhance : true
	});
</script>
```


---


License
=======
This plugin is available under the BSD-3-Clause License.
