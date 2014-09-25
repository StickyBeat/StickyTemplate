
StickyTemplate = function(){
};

StickyTemplate.templates = {};

StickyTemplate.loadFile =
StickyTemplate.loadFiles = 
function( files, callback ){

	if( !files ){
		files = [];
	}
	else if( !$.isArray( files ) ){
		files = [ files ];
	}

	for( var i=0; i<files.length; i++ ){

		var file = files[ i ];
		var name = StickyTemplate.stripName( file );

		var template = {
			name: name,
			loaded: false
		};

		StickyTemplate.templates[ name ] = template;

		$.get( file, function( html ){

			StickyTemplate.loadHTML( this.name, html );

			if( StickyTemplate.isLoaded() ){
				callback();
			}

		}.bind( template ) );
	}

};

StickyTemplate.loadHTML = 
function( name, html ){

	var template = StickyTemplate.templates[ name ];

	if( !template ){
		template = StickyTemplate.templates[ name ] = { name: name };
	}

	var $jq = $(html);

	$jq.find('[data-sticky-template]').each( function(){
		var $sub = $(this);
		$sub.remove();
		var subName = $sub.data('sticky-template');
		$sub.removeData('id');
		StickyTemplate.loadHTML( subName, $sub.get(0).outerHTML );
	});

	html = $jq.get(0).outerHTML;

	template.loaded = true;
	template.html = html;
	template.$jQuery = $jq;
}

StickyTemplate.getJQuery = 
StickyTemplate.getJQ = 
StickyTemplate.jQuery = 
StickyTemplate.jq = 
function( name, params ){

	var template = StickyTemplate.templates[ name ] || null;

	if( !template ){
		return null;
	}

	var html = template.html;
	var anyTokens = false;

	if( params ){
		for( var token in params ){
			if( token.substr(0,1) != '%' ){
				continue;
			}

			var value = params[ token ];

			if( value.jquery ){
				value = value.get(0).outerHTML;
			}

			html = html.replace( token, value );
			anyTokens = true;
		}
	}

	var $jq;

	if( anyTokens ){
		$jq = $(html);
	}
	else{
		$jq = template.$jQuery.clone();
	}

	if( params ){
		for( var selector in params ){
			if( selector.substr(0,1) == '%' ){
				continue;
			}

			var value = params[ selector ];

			var selectorParts = selector.split( /\$/g );

			selector = selectorParts[0];

			var attribute = null;

			if( selectorParts.length > 1 ){
				attribute = selectorParts[1];
			}

			var $targets = $jq.find( selector ).addBack( selector );

			if( attribute ){
				$targets.attr( attribute, value );
			}
			else if( value.jquery ){
				$targets.empty().append( value );
			}
			else{
				$targets.text( value );
			}
		}
	}

	return $jq;
};

StickyTemplate.getElement =
StickyTemplate.element = 
function( name, params ){

	var $jq = StickyTemplate.jq( name, params );

	if( $jq ){
		return $jq.get(0);
	}
	else{
		return null;
	}
};

StickyTemplate.getHTML = 
StickyTemplate.html = 
function( name, params ){

	var element = StickyTemplate.element( name, params );

	if( element ){
		return element.outerHTML;
	}
	else{
		return null;
	}
};

StickyTemplate.isLoaded = 
function( name ){

	if( name ){

		return StickyTemplate.templates[ name ].loaded;
	}
	else{

		for( var name in StickyTemplate.templates ){
			if( !StickyTemplate.templates[ name ].loaded ){
				return false;
			}
		}

		return true;
	}
};

StickyTemplate.stripName = 
function( str ){

	str = str.split('/').pop();
	str = str.split('.')[0];
	return str;
};

