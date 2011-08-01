/*
 * Ext JS BR Forum
 * http://www.extjs.com.br/forum/index.php?topic=5124.0
 */
Ext.define('Ux.CnpjField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.cnpjfield'],

   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 15 : 19,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cnpj: function(b, a) {
            return me.verificaCNPJ(b);
         },
         cnpjText: "CNPJ não é válido!"
      });

      Ext.apply(me, { vtype: 'cnpj' });

      me.callParent();
   },
   initEvents: function() {
      var me = this;
      var el = me.inputEl;

      el.on("keydown", me.stopEventFunction, me);
      el.on("keyup", me.formatCNPJ, me);
      el.on("keypress", me.stopEventFunction, me);
      el.on("focus", me.startCNPJ, me);
      el.on("blur", me.clearCNPJ, me);

      me.callParent();
   },
   KEY_RANGES: {
      numeric: [48, 57],
      padnum: [96, 105]
   },
   isInRange: function(a, b) {
      return a >= b[0] && a <= b[1];
   },
   stopEventFunction: function(a) {
      var me = this;

      var b = a.getKey();
      if (me.isInRange(b, me.KEY_RANGES.padnum)) {
         b -= 48;
      }
      if (((b >= 41 && b <= 122) || b == 32 || b == 8 || b > 186) && (!a.altKey && !a.ctrlKey)) {
         a.stopEvent();
      }
   },
   startCNPJ: function() {
      var me = this;
      var a = me.inputEl.dom;

      if (a.value == "") {
         a.value = "";
         if (me.soNumero) {
            a.value = "000000000000000";
         } else {
            a.value = "000.000.000/0000-00";
         }
      }
   },
   clearCNPJ: function() {
      var me = this;
      var a = me.inputEl.dom;
      if (a.value == "000.000.000/0000-00" || a.value == "000000000000000"){
         a.value = "";
         me.validate();
      }
   },
   formatCNPJ: function(k) {
      var me = this;
      var e = me.inputEl.dom;

      var j = k.getKey();
      if (me.isInRange(j, me.KEY_RANGES.padnum)) {
         j -= 48;
      }
      var d = (me.isInRange(j, me.KEY_RANGES.numeric) ? String.fromCharCode(j) : "");
      var h = (e.value.replace(/\D/g, "").substr(1) + d).replace(/\D/g, "");

      var a = h.length;
      if (d == "" && a > 0 && j == 8) {
         a--;
         h = h.substr(0, a);
         k.stopEvent();
      }
      if (e.maxLength + 1 && a >= e.maxLength) {
         return false;
      }
      if (a < 15) {
         var b = "";
         for (var c = 0; c < 15 - a; c++) {
            b = b + "0";
         }
         h = b + h;
         a = 15;
      }
      if (me.soNumero) {
         e.value = h;
      } else {
         var l = "";
         l = h.substr(0, 3) + "." + h.substr(3, 3) + "." + h.substr(6, 3) + "/" + h.substr(9, 4) + "-" + h.substr(13);
         e.value = l;
      }
   },
   verificaCNPJ: function(a) {
      var me = this;
      if (a == "") return true;

      a = a.replace(/\D/g, "");
      a = a.replace(/^0+/, "");
      if (parseInt(a, 10) == 0) {
         return false;
      } else {
         g = a.length - 2;
         if (me.testaCNPJ(a, g) == 1) {
            g = a.length - 1;
            if (me.testaCNPJ(a, g) == 1) {
               return true;
            } else {
               return false;
            }
         } else {
            return false;
         }
      }
   },
   testaCNPJ: function(a, d) {
      var b = 0;
      var e = 2;
      var c;
      for (f = d; f > 0; f--) {
         b += parseInt(a.charAt(f - 1),10) * e;
         if (e > 8) {
            e = 2;
         } else {
            e++;
         }
      }
      b %= 11;
      if (b == 0 || b == 1) {
         b = 0;
      } else {
         b = 11 - b;
      }
      if (b != parseInt(a.charAt(d),10)) {
         return (0);
      } else {
         return (1);
      }
   }
});