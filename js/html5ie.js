function IEHtmlStyle() {

	var tags = [
		{ 'tag': 'article', 'display': 'block' },
		{ 'tag': 'aside', 'display': 'block' },
		{ 'tag': 'audio', 'display': 'auto' },
		{ 'tag': 'canvas', 'display': 'auto' },
		{ 'tag': 'command', 'display': 'auto' },
		{ 'tag': 'datalist', 'display': 'auto' },
		{ 'tag': 'details', 'display': 'block' },
		{ 'tag': 'embed', 'display': 'auto' },
		{ 'tag': 'figcaption', 'display': 'block' },
		{ 'tag': 'figure', 'display': 'block' },
		{ 'tag': 'footer', 'display': 'block' },
		{ 'tag': 'header', 'display': 'block' },
		{ 'tag': 'hgroup', 'display': 'block' },
		{ 'tag': 'keygen', 'display': 'inline-block' },
		{ 'tag': 'mark', 'display': 'auto' },
		{ 'tag': 'meter', 'display': 'inline-block' },
		{ 'tag': 'nav', 'display': 'block' },
		{ 'tag': 'output', 'display': 'inline' },
		{ 'tag': 'progress', 'display': 'inline-block' },
		{ 'tag': 'rp', 'display': 'auto' },
		{ 'tag': 'rt', 'display': 'auto' },
		{ 'tag': 'ruby', 'display': 'auto' },
		{ 'tag': 'section', 'display': 'block' },
		{ 'tag': 'source', 'display': 'auto' },
		{ 'tag': 'summary', 'display': 'block' },
		{ 'tag': 'time', 'display': 'auto' },
		{ 'tag': 'video', 'display': 'auto' },
		{ 'tag': 'wbr', 'display': 'auto' }
	];

	this.reg = function() {

		for (var i = 0; i < tags.length; i++) {
			document.createElement(tags[i].tag);
		}

	};

}

var iehs = new IEHtmlStyle();
iehs.reg();

/* https://gist.github.com/379601 */

$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur().parents('form').submit(function() {
  $(this).find('[placeholder]').each(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
  })
});

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}