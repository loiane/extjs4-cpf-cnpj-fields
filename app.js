Ext.Loader.setConfig({enabled: true});

Ext.require([
	'Ux.CpfField',
	'Ux.CnpjField'
]);

Ext.onReady(function() {
	
	Ext.create('Ext.form.Panel', {
		renderTo: Ext.getBody(),
		title: 'Exemplo Campos CPF e CNPJ',
		width: 250,
		bodyPadding: 5,
		fieldDefaults: {
			labelAlign: 'left',
			labelWidth: 50,
			anchor: '100%',
			msgTarget: 'under'
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'CPF', 
			name: 'campoCPF', 
			xtype: 'cpffield'
		},{
			fieldLabel: 'CNPJ', 
			name: 'campoCNPJ', 
			xtype: 'cnpjfield'
		}]
	});
	
});