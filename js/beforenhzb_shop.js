setTimeout(function(){
	!function(t, e, a, n) {
	
	"use strict";
	function i(e, a) {
		this.element = t(e),
			this.settings = t.extend(!0, {},
				s, a),
			this.cart = this.element.find("." + this.settings.cart),
			this.product = this.element.find("." + this.settings.product),
			this._defaults = s,
			this._name = r,
			this.init()
	}

	var r = "ctshop",
		s = {
			cart: "ct-cart",
			product: "ct-product",
			product_title: "ct-product-title",
			product_price: "ct-product-price",
			product_button: "ct-product-button",
			currency: "￥",
			currency_after_number: "false",
			permanent_cart_buttons: "false",
			display_total_value: "true",
			permanent_total_value: "false",
			animation: "fadeIn",
			empty_disable: "false",
			empty_text: "这里空空如也",
			paypal: {
				business: "danianhua",
				currency_code: 'RMB',
				lc: "EN",
				cpp_cart_border_color: "",
				cpp_payflow_color: "",
				no_note: "0",
				no_shipping: "0",
				"return": "",
				cancel_return: ""
			},
			lang: {
				clear: '清空',
				checked: '结算'
			},
			init: !1,
			before_add_to_cart: !1,
			after_add_to_cart: !1,
			remove_item_from_cart: !1,
			before_checkout: !1,
			after_clear_cart: !1,
			after_value_changes: !1,

		};
		
	t.extend(i.prototype, {
			init: function() {
				var a = this;
				if(a.cart = a.cart.append("<ol/>").find("ol"), a.permanent_total(), a.permanent_cart_buttons(), e.sessionStorage.cart) {
					var n = a.cart.find("li"),
						i = n.find("." + a.settings.cart + "-input"),
						r = n.length;
					a.create_storage_cart(),
						"false" === a.settings.permanent_cart_buttons && a.add_cart_buttons(),
						"true" === a.settings.display_total_value && "false" === a.settings.permanent_total_value && a.append_total(),
						a.calculate_total_value(),
						a.quantity_change(i),
						a.remove_item(r)
				}
				a.settings.init && a.settings.init(),
					a.cart_empty(),
					a.product.each(function(e) {
						var n = t(this),
							i = n.find("." + a.settings.product_title),
							r = n.find("." + a.settings.product_price),
							s = n.find("." + a.settings.product_button),
							c = i.text(),
							o = r.text().replace(",", "").replace(/[^\d.]/g, "");
						s.on("click touchend",
							function(t) {
								t.preventDefault(),
									a.settings.before_add_to_cart && a.settings.before_add_to_cart(),
									c = a.check_if_title(i, c),
									o = a.check_if_price(r, o);
								var s,
									u = n.attr("data-id", c.replace(/ /g, "").replace(/\r\n|\r|\n/g, "").replace(/[^a-zA-Z 0-9]+/g, "") + r.text().replace(/\r\n|\r|\n/g, "").replace(/[^a-zA-Z 0-9]+/g, "") + "_" + (e + 1)).attr("data-id"),
									l = a.cart.find("li"),
									_ = a.cart.find("[data-id=" + u + "]"),
									p = _.attr("data-id"),
									d = l.find("." + a.settings.cart + "-input");
								d.val();
								return 0 !== l.length ? p !== u ? a.add_to_cart(c, o, u) : _.find("input").val(function(t, e) {
										return parseInt(e, 10) + 1
									}) : (a.add_to_cart(c, o, u), "false" === a.settings.permanent_cart_buttons && a.add_cart_buttons(), "true" === a.settings.display_total_value && "false" === a.settings.permanent_total_value && a.append_total()),
									l = a.cart.find("li"),
									d = l.find("." + a.settings.cart + "-input"),
									s = l.length,
									a.quantity_change(d),
									a.calculate_total_value(),
									a.remove_item(s),
									a.settings.after_add_to_cart && a.settings.after_add_to_cart(), !1
							})
					})
			},
			add_to_cart: function(t, e, a) {
				var n = this;
				n.cart.append("true" === n.settings.currency_after_number ? '<li class="animated ' + n.settings.animation + '" data-id=' + a + "><span class=" + n.settings.cart + "-name>" + t + "</span><span class=" + n.settings.cart + "-price>" + e + n.settings.currency + '</span><input type="number" min="1" value="1" class=' + n.settings.cart + "-input><button class=" + n.settings.cart + "-remove>&times;</button></li>" : '<li class="animated ' + n.settings.animation + '" data-id=' + a + "><span class=" + n.settings.cart + "-name>" + t + "</span><span class=" + n.settings.cart + "-price>" + n.settings.currency + e + '</span><input type="number" min="1" value="1" class=' + n.settings.cart + "-input><button class=" + n.settings.cart + "-remove>&times;</button></li>"),
					n.storage_set()
			},
			add_cart_buttons: function() {
				var t = this;
				t.cart.parent().append('<button class="' + t.settings.cart + '-clear">' + s.lang.clear + '</button>'),
					t.cart.parent().append('<button type="submit" class="' + t.settings.cart + '-checkout">' + s.lang.checked + '</button>'),
					t.clear_cart(),
					t.checkout_button()
			},
			checkout: function() {
				var url;
				var result = [];
				$('input').each(function() {
					result.push($(this).val());
				});			
				var f=0;
				var price = $(".ct-cart-total").text();
					url = "beforemoney.html?&price=" + price+"&pructed=";
					$("li").each(function() {		
						url+=$(this).text()+result[f++]+"\r\n";
					});				
					url=encodeURI(encodeURI(url)); 
					var winobj = window.open(url, "_blank");
					winobj.location.href = url;
				
			},
			checkout_button: function() {
				var e = this;
				t("." + e.settings.cart + "-checkout").unbind().on("click",
					function() {
						e.settings.before_checkout && e.settings.before_checkout(),
							e.checkout()
					})
			},
			remove_item: function(e) {
				var a = this;
				t("." + a.settings.cart + "-remove").unbind().on("click",
					function() {
						var e = t(this),
							n = a.cart.find("li").length;
						e.parent().remove(),
							a.calculate_total_value(),
							a.storage_set(),
							1 === n && (a.remove_cart_buttons(), a.remove_total(a.total), a.storage_clear()),
							a.settings.remove_item_from_cart && a.settings.remove_item_from_cart()
					})
			},
			clear_cart: function() {
				var e = this;
				t("." + e.settings.cart + "-clear").on("click",
					function() {
						e.cart.find("li").each(function() {
								t(this).remove()
							}),
							e.remove_cart_buttons(),
							e.remove_total(e.total),
							e.storage_clear(),
							e.cart_empty(),
							e.settings.after_clear_cart && e.settings.after_clear_cart()
					})
			},
			remove_cart_buttons: function() {
				var t = this;
				"false" === t.settings.permanent_cart_buttons && t.cart.parent().find("button").remove()
			},
			check_if_title: function(t, e) {
				return 0 !== t.find("select").length ? e = 0 !== t.find("span").length ? t.find("span").text() + " - " + t.find("option:selected").val() : t.find("option:selected").text() : 0 !== t.find("input").length ? e = t.find("input").val() : t.is(":empty") && (e = t.val()),
					e
			},
			check_if_price: function(t, e) {
				return 0 !== t.find("select").length ? e = parseFloat(t.find("option:selected").val().replace(/^\D+/g, "")) : 0 !== t.find("input").length && (e = parseFloat(t.find("input").val().replace(/^\D+/g, ""))),
					e
			},
			permanent_cart_buttons: function() {
				var t = this;
				"true" === t.settings.permanent_cart_buttons && t.add_cart_buttons()
			},
			calculate_total_value: function(e) {
				var a = this,
					n = 0,
					i = 0;
				return a.cart.find("li").each(function() {
						var e = parseFloat(t(this).find("." + a.settings.cart + "-price").text().replace(/^\D+/g, "")),
							r = t(this).find("input").val();
						i += e * r,
							n = parseFloat(i.toString()).toFixed(2)
					}),
					"true" === a.settings.display_total_value && a.total.html("true" === a.settings.currency_after_number ? n + a.settings.currency : a.settings.currency + n),
					a.cart_empty(),
					a.settings.after_value_changes && a.settings.after_value_changes(),
					n
			},
			quantity_change: function(t, e) {
				var a = this;
				t.change(function() {
					a.calculate_total_value(e),
						a.storage_set()
				})
			},
			append_total: function() {
				var t = this;
				t.total = t.cart.parent().prepend('<span class="' + t.settings.cart + '-total">').find("." + t.settings.cart + "-total")
			},
			remove_total: function(t) {
				var e = this;
				"true" === e.settings.display_total_value && "false" === e.settings.permanent_total_value ? t.remove() : "true" === e.settings.permanent_total_value && "true" === e.settings.display_total_value && e.calculate_total_value(t)
			},
			permanent_total: function() {
				var t = this;
				"true" === t.settings.permanent_total_value && "true" === t.settings.display_total_value && (t.append_total(), "true" === t.settings.display_total_value && t.total.html("true" === t.settings.currency_after_number ? "0" + t.settings.currency : t.settings.currency + "0"))
			},
			storage_set: function() {
				var t = this,
					a = {
						items: []
					};
				$(t.cart).find("li").each(function() {
						var e = $(this),
							n = e.attr("data-id"),
							i = e.find("." + t.settings.cart + "-name").text(),
							r = e.find("." + t.settings.cart + "-price").text(),
							s = e.find("input").val(),
							c = {
								name: i,
								id: n,
								price: r,
								input: s
							};
						a.items.push(c)
					}),
					e.sessionStorage.setItem("cart", JSON.stringify(a))
			},
			storage_get: function() {
				var t = e.sessionStorage.cart;
				return t = JSON.parse(t)
			},
			storage_clear: function() {
				e.sessionStorage.removeItem("cart")
			},
			create_storage_cart: function() {
				for(var t = this, e = t.storage_get(), a = 0, n = e.items.length; n > a; a++) {
					var i = e.items[a].id,
						r = e.items[a].name,
						s = e.items[a].price,
						c = e.items[a].input;
					t.cart.append('<li class="animated ' + t.settings.animation + '" data-id=' + i + "><span class=" + t.settings.cart + "-name>" + r + "</span><span class=" + t.settings.cart + "-price>" + s + '</span><input type="number" min="1" value="' + c + '" class=' + t.settings.cart + "-input><button class=" + t.settings.cart + "-remove>x</button></li>")
				}
			},
			cart_empty: function() {
				var t = this,
					e = t.settings.cart + "-empty";
				"false" === t.settings.empty_disable && (t.cart.find("li").length ? $("." + e).remove() : t.cart.parent().prepend('<span class="' + e + '">' + t.settings.empty_text + "</span>"))
			}
		}),
		t.fn[r] = function(e) {
			return this.each(function() {
				t.data(this, "plugin_" + r) || t.data(this, "plugin_" + r, new i(this, e))
			})
		}
		$('html body').ctshop();
}(jQuery, window, document);
},2000);