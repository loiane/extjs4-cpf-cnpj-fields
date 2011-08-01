/*
 * Ext JS BR Forum
 * http://www.extjs.com.br/forum/index.php?topic=5125.0 
 */
Ext.define('Ux.CpfField', {
   extend: 'Ext.form.field.Text',
   alias: ['widget.cpffield'],

   autocomplete: "off",
   soNumero: false,
   maxLength: (this.soNumero) ? 11 : 14,

   initComponent: function(){
      var me = this;

      Ext.apply(Ext.form.VTypes, {
         cpf: function(b, a) {
            return me.validacpf(b);
         },
         cpfText: "CPF inválido!"
      });

      Ext.apply(me, { vtype: 'cpf' });
      me.callParent();
   },
   initEvents: function() {
      var me = this;
      var el = me.inputEl;

      el.on("keydown", me.stopEventFunction, me);
      el.on("keyup", me.formatCPF, me);
      el.on("keypress", me.stopEventFunction, me);
      el.on("focus", me.startCPF, me);
      el.on("blur", me.clearCPF, me);

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
   startCPF: function() {
      var me = this;
      var a = me.inputEl.dom;

      if (a.value == "") {
         a.value = "";
         if (me.soNumero) {
            a.value = "00000000000";
         } else {
            a.value = "000.000.000-00";
         }
      }
   },
   clearCPF: function() {
      var me = this;
      var a = me.inputEl.dom;
      if (a.value == "000.000.000-00" || a.value == "00000000000"){
         a.value = "";
         me.validate();
      }
   },
   formatCPF: function(k) {
      var me = this;
      var j = k.getKey();
      if (me.isInRange(j, me.KEY_RANGES.padnum)) {
         j -= 48;
      }
      var d = (me.isInRange(j, me.KEY_RANGES.numeric) ? String.fromCharCode(j) : "");
      var e = me.inputEl.dom;
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
      if (a < 11) {
         var b = "";
         for (var c = 0; c < 11 - a; c++) {
            b = b + "0";
         }
         h = b + h;
         a = 11;
      }
      if (me.soNumero) {
         e.value = h;
      } else {
         var l = "";
         l = h.substr(0, 3) + "." + h.substr(3, 3) + "." + h.substr(6, 3) + "-" + h.substr(9);
         e.value = l;
      }
   },
   validacpf: function(e) {
      if (e == "")
         return true;
      var b;
      s = e.replace(/\D/g, "");
      if (parseInt(s, 10) == 0) {
         return false;
      }

      var iguais = true;
      for (i = 0; i < s.length - 1; i++){
         if (s.charAt(i) != s.charAt(i + 1)){
            iguais = false;
         }
      }

      if (iguais)
         return false;

      var h = s.substr(0, 9);
      var a = s.substr(9, 2);
      var d = 0;
      for (b = 0; b < 9; b++) {
         d += h.charAt(b) * (10 - b);
      }
      if (d == 0) {
         return false;
      }
      d = 11 - (d % 11);
      if (d > 9) {
         d = 0;
      }
      if (a.charAt(0) != d) {
         return false;
      }
      d *= 2;
      for (b = 0; b < 9; b++) {
         d += h.charAt(b) * (11 - b);
      }
      d = 11 - (d % 11);
      if (d > 9) {
         d = 0;
      }
      if (a.charAt(1) != d) {
         return false;
      }
      return true;
   }
});