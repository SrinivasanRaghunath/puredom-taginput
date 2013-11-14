puredom.taginput
================
A puredom plugin that adds support for `<input type="tag">` to forms wrapped in [puredom.FormHandler](http://puredom.org/docs/symbols/puredom.FormHandler.html).  
It enhances input fields with an interactive list of tags, represented in field values as a comma-separated list.  

*To use taginput, add the CSS and JS files to your page:*  
```html
<link rel="stylesheet" type="text/css" href="puredom.taginput.css" />
<script src="puredom.taginput.js"></script>
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
This plugin is available under the BSD-3-Clause License:

>	Copyright (c) Jason Miller. All rights reserved.
>	
>	Redistribution and use in source and binary forms, with or without modification, 
>	are permitted provided that the following conditions are met:
>	
>	*	Redistributions of source code must retain the above copyright notice, 
>		this list of conditions and the following disclaimer.
>	
>	*	Redistributions in binary form must reproduce the above copyright notice, 
>		this list of conditions and the following disclaimer in the documentation 
>		and/or other materials provided with the distribution.
>	
>	*	Neither the name of Jason Miller, nor the names of its contributors may be used to endorse 
>		or promote products derived from this software without specific prior written permission.
>	
>	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
>	OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
>	AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER 
>	OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
>	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
>	DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
>	IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
>	OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
