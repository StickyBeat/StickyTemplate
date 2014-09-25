StickyTemplate
==============

A simple but dynamic JavaScript template library.

Loading templates
-----------------

Load from HTML string:

	StickyTemplate.loadHTML( 
		'header', 
		'<div><h1></h1><p class="subtitle"></p>'
		);

	StickyTemplate.loadHTML( 
		'text', 
		'<div><p>%text%</p><img src="%image-url%" alt=""/></div>'
		);

Load from HTML file, with callback:

	StickyTemplate.loadFile( 
		'templates/header.html', 
		function(){
			console.log('template loaded!');
		});

Load multiple HTML files, with callback:

	StickyTemplate.loadFiles(
		[
			'templates/header.html',
			'templates/middle.html',
			'templates/footer.html'
		],
		function(){
			console.log('templates loaded!');
		});

Using templates
---------------

Get template as jQuery object.

	$header = StickyTemplate.getJQuery( 'header' );
	$('body').append( $header );

Get template as DOM element.

	header = StickyTemplate.getElement( 'header' );
	body.appendChild( header );

Get template as HTML string.

	header = StickyTemplate.getHTML( 'header' );
	document.write( header );


Using parameters
----------------

Get template with css selector parameters - this will replace the text content of elements matched by the selector with the specified text.

	$header = StickyTemplate.getJQuery( 'header',
		{
			'h1' : 'Big Header Text',
			'p.subtitle' : 'Subtitle Text'
		});

Get template with css selector/attribute parameters - this will replace the value of a certain attribute of elements matched by the selector.

	$text = StickyTemplate.getJQuery( 'text',
		{
			'p$class' : 'red-text',
			'img$src' : 'img/photo1.jpg'
		});

Get template with token parameters. Tokens are replaced in HTML strings before being converted to DOM objects.

	$text = StickyTemplate.getJQuery( 'text',
		{
			'%text%' : 'paragraph text',
			'%image-url%' : 'img/photo1.jpg'
		});

Get template with jQuery objects for parameter values.

	$text = StickyTemplate.getJQuery( 'text',
		{
			'%text%' : $('<span><span class="red">red text</span>, <span class="blue">blue text</span></span>'),
		});



Defining multiple templates in a single HTML file (or string)
-------------------------------------------------------------

Elements with a data-sticky-template attribute are removed from template contents and defined as templates of their own.

table.html:

	<table>
		<tr>
			<th class="first-name">First name</th>
			<th class="last-name">Last name</th>
		</tr>
		<tr data-sticky-template="table-row">
			<th class="first-name"></th>
			<th class="last-name"></th>
		</tr>
	</table>

JS:

	StickyTemplate.loadFile( 'table.html',
		function(){

			var $table = StickyTemplate.getJQuery( 'table' );

			for( var n=0; n<10; n++ ){

				var $row = StickyTemplate.getJQuery( 'table-row', 
					{
					'.first-name' : 'First ' + n 
					'.last-name' : 'Last ' + n 
					});

				$table.append( $row );
			}
		});


Shorthands
----------

The following are equivalent:

	StickyTemplate.getJQuery
	StickyTemplate.getJQ
	StickyTemplate.jQuery
	StickyTemplate.jq
 
The following are equivalent:

	StickyTemplate.getElement
	StickyTemplate.element
 
The following are equivalent:

	StickyTemplate.getHTML
	StickyTemplate.html


Questions, comments and suggestions
-----------------------------------

Please mail things like that straight to erik@stickybeat.se!
