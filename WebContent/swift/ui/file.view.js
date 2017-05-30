sap.ui.jsview("swift.ui.file", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf swift.ui.file
	 */ 
	getControllerName : function() {
		return "swift.ui.file";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf swift.ui.file
	 */ 
	createContent : function(oController) {
		var oTextView = new sap.ui.commons.TextView("textview", {
			text: "File Upload and Download using Swift",
			width : "500px",
			semanticColor: sap.ui.commons.TextViewColor.Positive,
			design: sap.ui.commons.TextViewDesign.H1
		});
		
		var oTextViewUpload = new sap.ui.commons.TextView("textviewupload", {
			text: "Upload File:",
			width : "600px",
			semanticColor: sap.ui.commons.TextViewColor.Critical,
			design: sap.ui.commons.TextViewDesign.H2
		});
		
		var oFileUpload = new fileUploader("fileUpload", {
			width : "50%",
			sendXHR : true,
			uploadProgress : [function(oEvent){
				this.handleUploadProgress(oEvent);
			}, this],
			uploadComplete : [function(oEvent){
				this.handleUploadComplete(oEvent);
			}, this]
		});

		var oTextField = new sap.ui.commons.TextField("textfield", {
			placeholder: "Specify the file path here, Example: <thingId>/<path>/<filename>",
			width : "50%",
		});
		
/*		var oContentType = new sap.ui.commons.TextField("contenttype", {
			placeholder: "Specify the content type here, Example: application/pdf",
			width : "50%",
		});*/
		
		var oUploadBtn = new sap.ui.commons.Button("upload", {
			text: "Upload",
			style: sap.ui.commons.ButtonStyle.Emph,
			width: "100px",
			height: "20px",
			press: function(oEvent){
				oController.handleUploadPress(oEvent);
			}
		});
		
		var oProgressIndicator = new sap.ui.commons.ProgressIndicator("progressindicator", {
			width: "600px",
			percentValue: 0,
			displayValue: "0%",
			barColor: sap.ui.core.BarColor.NEGATIVE,
			enabled: false
			});

		var oDialog = new sap.ui.commons.Dialog("myDialog", {
			title: "Uploading...", 
			modal: true,
		    content: [oProgressIndicator]	
		});
		
		var oTextViewDownload = new sap.ui.commons.TextView("textviewdownload", {
			text: "Download File:",	
			width : "500px",
			semanticColor: sap.ui.commons.TextViewColor.Critical,
			design: sap.ui.commons.TextViewDesign.H2
		});
		
		var oTransTree = new sap.ui.commons.Tree("tree", {
			"title": "File Explorer",
			"width": "50%",
			"height": "auto",
			"showHeader": true,
			"showHeaderIcons" : true,
			"showHorizontalScrollbar" : false,
		});

		var oVerticalLayout = new sap.ui.commons.layout.VerticalLayout({
			content: [oTextView, oTextViewUpload, oFileUpload, oTextField, oUploadBtn, oTextViewDownload, oTransTree]
		});
		return oVerticalLayout;
	}
});
