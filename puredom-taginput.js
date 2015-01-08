(function(g, factory) {
	if (typeof define==='function' && define.amd) {
		define(['puredom'], factory);
	}
	else if (typeof module==='object' && typeof require==='function') {
		module.exports = factory(require('puredom'));
	}
	else {
		g.taginput = g['puredom-taginput'] = factory(window.puredom);
	}
}(this, function($) {
	var exports = {
		enhance : function(n) {
			$(n).taginput();
		}
	};

	function init() {
		$.FormHandler.addCustomType(api);

		$.addNodeSelectionPlugin('taginput', function(enabled) {
			return this.each(enabled===false ? api.destroy : api.enhance);
		});

		$.addNodeSelectionPlugin('removetaginput', function() {
			return this.each(api.destroy);
		});
	}

	var api = {

		id : 'tags',

		types : ['tags', 'tag'],

		objs : [],

		createUI : function(obj) {
			obj.ui = $({
				className : 'puredom_taginput',
				attributes : {
					'data-input' : obj.input.uuid()
				},
				children : [
					{ className:'puredom_taginput_inner', children:[
						{ className:'puredom_taginput_taglist' },
						{
							className : 'puredom_taginput_inputwrap',
							children : [
								{
									type : 'input',
									className : 'puredom_taginput_input',
									attributes : {
										type : 'text'
									},
									onkeydown : obj.handlers.keydown,
									onclick : obj.handlers.inputClick,
									onfocus : obj.handlers.inputFocus,
									onblur : obj.handlers.inputBlur
								}
							]
						}
					]},
				],
				onmousedown : obj.handlers.grabFocus,
				ononmouseup : obj.handlers.grabFocus,
				onfocus : obj.handlers.grabFocus,
				insertBefore : obj.input.next(),
				parent : obj.input.parent()
			});
		},

		addTag : function(obj, tag) {
			$({
				className : 'puredom_taginput_tag',
				attributes : {
					'data-tag' : tag
				},
				children : [
					{
						type : 'span',
						className : 'puredom_taginput_tag_label',
						innerHTML : tag ? $.htmlEntities(tag) : '&nbsp;'
					},
					{
						type  : 'span',
						className : 'puredom_taginput_tag_removeBtn',
						innerHTML : '&times;',
						onmousedown : obj.handlers.removeClick
					}
				],
				onmousedown : obj.handlers.tagClick,
				oncontextmenu : $.cancelEvent,
				onselectstart : $.cancelEvent
			}, obj.ui.query('.puredom_taginput_taglist'));
		},

		removeTag : function(obj, tag) {
			obj.ui.query('.puredom_taginput_tag[data-tag]').each(function(node) {
				if (node.attr('data-tag')===tag) {
					node.destroy();
					return false;
				}
			});
		},

		update : function(obj) {
			var value = (obj.input.value() || '').replace(/(\s+\,\s+|\s+\,|\,\s+)/gim,','),
				tags = value ? value.split(',') : [],
				cur = obj.currentTags || [],
				added = [],
				removed = [],
				i;
			for (i=0; i<tags.length; i++) {
				if (cur.indexOf(tags[i])===-1) {
					this.addTag(obj, tags[i], {
						fireChange : false
					});
				}
			}
			for (i=0; i<cur.length; i++) {
				if (tags.indexOf(cur[i])===-1) {
					this.removeTag(obj, cur[i], {
						fireChange : false
					});
				}
			}
			obj.currentTags = tags;
		},

		enhance : function(input) {
			this.destroy(input);

			var obj = {
				input : input,
				init : function() {
					api.createUI(obj);

					obj.input.css({ display:'none' });

					obj.update();

					obj.input.on('change', obj.handlers.inputChanged);
				},
				update : function() {
					api.update(obj);
				},
				destroy : function() {
					for (var x=api.objs.length; x--; ) {
						if (api.objs[x]===obj) {
							api.objs.splice(x, 1);
							break;
						}
					}
					obj.input.removeEvent('change', obj.handlers.inputChanged);
					obj.ui.destroy();
					obj.ui = obj.input = null;
					obj = null;
				},
				filterEmpties : function(arr) {
					for (var x=arr.length; x--; ) {
						if (!arr[x]) {
							arr.splice(x, 1);
						}
					}
				},
				add : function(tag, visualFeedback) {
					var tags = (obj.input.value() || '').replace(/(\s+\,\s+|\s+\,|\,\s+)/gim,',').split(','),
						i;
					i = tags.indexOf(tag);
					if (i!==-1) {
						if (visualFeedback===true) {
							obj.ui.query('[data-tag]').each(function(node) {
								if (node.attr('data-tag')===tag) {
									obj.tagExists(node);
									return false;
								}
							});
						}
						return false;
					}
					tags.push(tag);
					obj.filterEmpties(tags);
					obj.input.value(tags.join(','));
					return true;
				},
				remove : function(tag) {
					var tags = (obj.input.value() || '').replace(/(\s+\,\s+|\s+\,|\,\s+)/gim,',').split(','),
						i;
					i = tags.indexOf(tag);
					if (i===-1) {
						return false;
					}
					tags.splice(i, 1);
					obj.filterEmpties(tags);
					obj.input.value(tags.join(','));
					return true;
				},
				tagExists : function(node) {
					node.classify('tagInput_existsblink').wait(200, function() {
						this.declassify('tagInput_existsblink').wait(200, function() {
							this.classify('tagInput_existsblink').wait(200, function() {
								this.declassify('tagInput_existsblink');
							});
						});
					});
					node = null;
				},
				getSelected : function() {
					return obj.ui.query('.puredom_taginput_tag.selected');
				},
				handlers : {
					inputChanged : function(e) {
						obj.update();
					},
					keydown : function(e) {
						var me = $(this),
							key = e.keyCode || e.which,
							value = $.text.trim(me.value() || ''),
							sel = me.selection(),
							selected = obj.getSelected();
						selected.declassify('selected');
						if (key===13 || key===188 || key===9) {			// return or comma
							if (obj.add(value,true)!==false) {
								me.value('');
							}
							if (value.length>0 || key===188) {
								return $.cancelEvent(e);
							}
						}
						else if (key===27) {					// escape
							me.value('').blur();
							return $.cancelEvent(e);
						}
						else if (key===8 || key===46) {			// backspace or del (backspace is <delete> on mac)
							if (selected.exists()) {
								obj.remove(selected.attr('data-tag'));
								me.value('').focus();
								return $.cancelEvent(e);
							}
							else {
								if (key===8 && (sel.start===sel.end && sel.start===0)) {
									selected = obj.ui.query('.puredom_taginput_tag').last();
									if (selected.exists()) {
										obj.remove(selected.attr('data-tag'));
									}
								}
							}
						}
						else if (key===37) {					// left
							if (!value || (sel.start===sel.end && sel.start===0)) {
								if (selected.exists()) {
									if (selected.previous().exists()) {
										selected.previous().classify('selected');
									}
									else {
										selected.classify('selected');
									}
								}
								else {
									selected = obj.ui.query('.puredom_taginput_tag').last();
									if (selected.exists()) {
										selected.classify('selected');
									}
								}
								return $.cancelEvent(e);
							}
						}
						else if (key===39) {					// right
							if (selected.exists() && (!value || (sel.start===sel.end && sel.start===0))) {
								if (selected.next().exists()) {
									selected.next().classify('selected');
								}
								return $.cancelEvent(e);
							}
						}
					},
					tagClick : function(e) {
						obj.handlers.grabFocus();
						obj.ui.query('.puredom_taginput_tag.selected').declassify('selected');
						$(this).classify('selected');
						return $.cancelEvent(e);
					},
					removeClick : function(e) {
						obj.remove($(this).parent().attr('data-tag'));
						return $.cancelEvent(e);
					},
					grabFocus : function(e) {
						obj.ui.query('input.puredom_taginput_input').focus();
					},
					inputClick : function(e) {
						obj.handlers.inputBlur.call(e);
					},
					inputFocus : function(e) {
						obj.handlers.inputBlur.call(e);
					},
					inputBlur : function(e) {
						var value = $(this).value();
						obj.getSelected().declassify('selected');
						obj.add(value,true);
						$(this).value('');
					}
				}
			};

			this.objs.push(obj);

			obj.init();

			input = null;
		},

		setValue : function(input, value) {
			var obj = this.getObjForInput(input);
			input.value(value || '');
			if (obj) {
				obj.update();
			}
		},

		getValue : function(input) {
			return input.value();
		},

		destroy : function(input) {
			var obj = this.getObjForInput(input);
			if (obj) {
				obj.destroy();
			}
		},
		unenhance : function(input) { this.destroy(input); },


		getObjForInput : function(input) {
			for (var x=this.objs.length; x--; ) {
				if (this.objs[x].input._nodes[0]===input._nodes[0]) {
					return this.objs[x];
				}
			}
			return false;
		}

	};

	init();

	return exports;
}));
