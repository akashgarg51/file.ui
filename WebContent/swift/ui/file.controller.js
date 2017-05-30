jQuery.sap.require("swift.ui.fileUploader");
jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.controller("swift.ui.file", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf swift.ui.file
	 */
	onInit: function() {
		var that=this;
		this.oTree = sap.ui.getCore().byId("tree");
		this.busyDialog = new sap.m.BusyDialog("busyDialog");
		this.oTransNode1 = new sap.ui.commons.TreeNode("transNode1", {text:"swift", icon:"images/network.gif", expanded: false});
		this.container1 = new sap.ui.commons.TreeNode("container1", {text:"com.sap.iotas.com-sap", icon:"images/system.gif", expanded: false});
		this.container2 = new sap.ui.commons.TreeNode("container2", {text:"things", icon:"images/system.gif", expanded: false});
		this.oTransNode3 = new sap.ui.commons.TreeNode("transNode3", {
//			text:"/Files/Things/7560F42F60D845A49B51BD9E28FDDA21/",
			text:"/Files/Things/B833978D10EC4402B60A82603CB0CBD9/", 
			icon:"images/disk.gif",
			expanded: false,
			hasExpander: true,
			toggleOpenState: function(oEvent){
				that.getFiles(oEvent);
			}
		});
		this.oTransNode4 = new sap.ui.commons.TreeNode("transNode4", {
			text:"/Files/Things/1315324D83EE4AF694D71D16FE2D1E43/", 
			icon:"images/disk.gif",
			expanded: false,
			hasExpander: true,
			toggleOpenState: function(oEvent){
				that.getFiles(oEvent);
			}
		});
		this.oTransNode5 = new sap.ui.commons.TreeNode("transNode5", {
			text:"/Files/Things/13338F73E402424AA0013B557555C320/", 
			icon:"images/disk.gif",
			expanded: false,
			hasExpander: true,
			toggleOpenState: function(oEvent){
				that.getFiles(oEvent);
			}
		});
		this.oTransNode6 = new sap.ui.commons.TreeNode("transNode6", {
			text:"/Files/Things/1480AE7679614F599F370AB838018B65/", 
			icon:"images/disk.gif",
			expanded: false,
			hasExpander: true,
			toggleOpenState: function(oEvent){
				that.getFiles(oEvent);
			}
		});
		this.oTransNode7 = new sap.ui.commons.TreeNode("transNode7", {
			text:"/Files/Things/1500F3D1ED01472093982F86E36D613D/", 
			icon:"images/disk.gif",
			expanded: false,
			hasExpander: true,
			toggleOpenState: function(oEvent){
				that.getFiles(oEvent);
			}
		});
		this.container1.addNode(this.oTransNode3);
		this.container1.addNode(this.oTransNode4);
		this.container1.addNode(this.oTransNode5);
		this.container2.addNode(this.oTransNode6);
		this.container2.addNode(this.oTransNode7);
		this.oTransNode1.addNode(this.container1);
//		this.oTransNode1.addNode(this.container2);
		this.oTree.addNode(this.oTransNode1);
	},
	
	handleUploadPress: function(oEvent){
		var file = jQuery.sap.domById("fileUpload-fu").files[0];
		var filePath = sap.ui.getCore().byId("textfield").getValue();
//		var contentType = sap.ui.getCore().byId("contenttype").getValue();
		if(file && filePath){
		sap.ui.getCore().byId("myDialog").open();
		sap.ui.getCore().byId("fileUpload").upload(file, filePath);
		}
		else{
		sap.ui.commons.MessageBox.show("Please browse the file, Specify file path and Content Type", "WARNING")
		}
	},
	
	getFiles: function(oEvent){
		if(oEvent.getParameters().opened == true){
			//		if(oEvent.getSource().getNodes().length == 0){
			this.busyDialog.open();
			oEvent.getSource().removeAllNodes();
			this.getFilesFromSwift(oEvent);
			//		}
		}
	},

	handleSelected : function(oEvent){
//		this.busyDialog.open();
		this.downloadFile(oEvent);
	},

	downloadFile : function(oEvent){
		var newWindow = window.open("https://iotas-router-com-sap-ci.cfapps.staging.sic.ondemand.com/appiot-fs" + this.getActualFilePath(oEvent.getSource()) + oEvent.getSource().getText(), '_blank');
		newWindow.focus();
//		window.location.assign("http://localhost:8082" + oEvent.getSource().getText());
//		newWindow.focus();
//		this.busyDialog.close();
	},

	getFilesFromSwift: function(oEvent){
		var that=this;
		var oEventSource = oEvent.getSource();
		var actualFilePath = this.getActualFilePath(oEventSource);
		jQuery.ajax({
	//		url: "http://localhost:8082" + actualFilePath + oEventSource.getText() + "?$top=100",	
			url: "https://appiot-fs-ci.cfapps.staging.sic.ondemand.com" + actualFilePath + oEventSource.getText() + "?$top=100",
			type: "GET",
			headers: {
//			"Access-Control-Allow-Origin" : "http://localhost:8080",
			"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzE1OGQ3My0zMzVkLTRjOGMtOGIwOS0zNDk5NzJhYWU0ZjAiLCJzdWIiOiI1MmNiMzAxOC0yMjM2LTRmZjAtYjM5ZS1lMjNmMGY5NGEzMGEiLCJzY29wZSI6WyJjb25mX2NpLlJlYWQiLCJsb2NfY2kuUmVhZCIsInRlbmFudF9jaS5DcmVhdGUiLCJ0aGluZ19jaS5TeXNBZG1pbiIsImJwX2NpLkNvbmZpZ3VyYXRpb24uUmVhZCIsInRoaW5nX2NpLmQiLCJ0aGluZ19jaS5jIiwiYnBfY2kuYyIsImJwX2NpLkNvbmZpZ3VyYXRpb24uRGVsZXRlIiwiYnBfY2kuZCIsInRlbmFudF9jaS5vcmcuZCIsInRlbmFudF9jaS5vcmcuYyIsImNvbmZfY2kuQ3JlYXRlIiwidGhpbmdfY2kuUmVhZCIsInRoaW5nX2NpLkNvbmZpZ3VyYXRpb24uUmVhZCIsImJwX2NpLnIiLCJ0aGluZ19jaS5FdmVudC5DcmVhdGUiLCJ0ZW5hbnRfY2kudGVuYW50LmQiLCJ0aGluZ19jaS5yIiwidGVuYW50X2NpLnRlbmFudC5jIiwidGhpbmdfY2kuRXZlbnQuciIsImJwX2NpLnUiLCJ0ZW5hbnRfY2kub3JnLnUiLCJicF9jaS50ZW5hbnQuYyIsImJwX2NpLnRlbmFudC5kIiwiYXV0aF9jaS5kIiwidGVuYW50X2NpLm9yZy5yIiwidGhpbmdfY2kuRGVsZXRlIiwiYXV0aF9jaS5jIiwidGhpbmdfY2kuRXZlbnQudSIsInRlbmFudF9jaS5SZWFkIiwiZmlsZV9jaS5TeXNBZG1pbiIsImN0X2NpLnIiLCJsb2NfY2kuQ3JlYXRlIiwidGVuYW50X2NpLnRlbmFudC5yIiwidGhpbmdfY2kuRXZlbnQuRGVsZXRlIiwiY29sZHN0b3JlX2NpLlN5c0FkbWluIiwiY29sZHN0b3JlX2NpLnIiLCJmaWxlX2NpLkNyZWF0ZSIsInRlbmFudF9jaS50ZW5hbnQudSIsImJwX2NpLlVwZGF0ZSIsImNvbmZfY2kuU3lzQWRtaW4iLCJvcGVuaWQiLCJicF9jaS5PbmJvYXJkVGVuYW50IiwibG9jX2NpLlVwZGF0ZSIsImF1dGhfY2kuQ29uZmlndXJhdGlvbi5DcmVhdGUiLCJhdXRoX2NpLnIiLCJ0aGluZ19jaS5FdmVudC5kIiwidGhpbmdfY2kuRXZlbnQuYyIsImF1dGhfY2kudSIsImF1dGhfY2kuVXBkYXRlIiwidGVuYW50X2NpLkRlbGV0ZSIsInRoaW5nX2NpLkNvbmZpZ3VyYXRpb24uQ3JlYXRlIiwieHNfYXV0aG9yaXphdGlvbi5yZWFkIiwiYnBfY2kuQ29uZmlndXJhdGlvbi5DcmVhdGUiLCJ0ZGVfY2kuU3lzQWRtaW4iLCJjb25mX2NpLkRlbGV0ZSIsImJwX2NpLkNyZWF0ZSIsImF1dGhfY2kuQ3JlYXRlIiwidGhpbmdfY2kuQ29uZmlndXJhdGlvbi5EZWxldGUiLCJ0aGluZ19jaS5DcmVhdGUiLCJ0ZW5hbnRfY2kucGVycy5yIiwidGRlX2NpLnIiLCJicF9jaS5SZWFkIiwiZmlsZV9jaS5EZWxldGUiLCJhdXRoX2NpLkNvbmZpZ3VyYXRpb24uRGVsZXRlIiwiYnBfY2kuU2VsZlNlcnZpY2UiLCJ0ZW5hbnRfY2kucGVycy51IiwidGRlX2NpLmQiLCJ0ZGVfY2kuYyIsInRoaW5nX2NpLkV2ZW50LlJlYWQiLCJhdXRoX2NpLkNvbmZpZ3VyYXRpb24uUmVhZCIsImJwX2NpLnRlbmFudC5yIiwiYnBfY2kudGVuYW50LnUiLCJhdXRoX2NpLkNyb3NzVGVuYW50TWFpbnRlbmFuY2UiLCJhdXRoX2NpLkRlbGV0ZSIsImF1dGhfY2kub2dhLmMiLCJhdXRoX2NpLm9nYS5kIiwiYnBfY2kuRGVsZXRlIiwieHNfYXV0aG9yaXphdGlvbi53cml0ZSIsInRlbmFudF9jaS5VcGRhdGUiLCJsb2NfY2kucGQiLCJ0ZW5hbnRfY2kucGVycy5kIiwidGVuYW50X2NpLnBlcnMuYyIsImF1dGhfY2kuUmVhZCIsImF1dGhfY2kuY3RtIiwiY3RvZGF0YV9jaS5yIiwidGhpbmdfY2kuRXZlbnQuVXBkYXRlIiwiYXV0aF9jaS5vZ2EuciIsImJwX2NpLlBoeXNpY2FsRGVsZXRlIiwiZmlsZV9jaS5SZWFkIiwiYXV0aF9jaS5vZ2EudSJdLCJjbGllbnRfaWQiOiJzYi1pb3Rhc19jaSIsImNpZCI6InNiLWlvdGFzX2NpIiwiYXpwIjoic2ItaW90YXNfY2kiLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwidXNlcl9pZCI6IjUyY2IzMDE4LTIyMzYtNGZmMC1iMzllLWUyM2YwZjk0YTMwYSIsInVzZXJfbmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckB1bmtub3duLm9yZyIsImdpdmVuX25hbWUiOiJ0ZXN0dXNlciIsImZhbWlseV9uYW1lIjoidW5rbm93bi5vcmciLCJpYXQiOjE0NzUwNjQyNjAsImV4cCI6MTQ3NTEwNzQ2MCwiaXNzIjoiaHR0cDovL2NvbS1zYXAubG9jYWxob3N0OjgwODAvdWFhL29hdXRoL3Rva2VuIiwiemlkIjoiY29tLXNhcCIsImhkYi5uYW1lZHVzZXIuc2FtbCI6Ijw_eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI_PjxzYW1sMjpBc3NlcnRpb24geG1sbnM6c2FtbDI9XCJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uXCIgSUQ9XCJfZTlkMDZhZTMtYTAxYS00NDk0LWJmYzgtOTgzMGMwMzI4Mjg0XCIgSXNzdWVJbnN0YW50PVwiMjAxNi0wOS0yOFQxMTo1OToyMC4yODBaXCIgVmVyc2lvbj1cIjIuMFwiPjxzYW1sMjpJc3N1ZXI-YXV0aGVudGljYXRpb24uc3RhZ2luZy5zaWMub25kZW1hbmQuY29tPC9zYW1sMjpJc3N1ZXI-PGRzOlNpZ25hdHVyZSB4bWxuczpkcz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNcIj48ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biNcIi8-PGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjcnNhLXNoYTFcIi8-PGRzOlJlZmVyZW5jZSBVUkk9XCIjX2U5ZDA2YWUzLWEwMWEtNDQ5NC1iZmM4LTk4MzBjMDMyODI4NFwiPjxkczpUcmFuc2Zvcm1zPjxkczpUcmFuc2Zvcm0gQWxnb3JpdGhtPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmVcIi8-PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biNcIi8-PC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTFcIi8-PGRzOkRpZ2VzdFZhbHVlPlBBUmVvMk5MUVFjUVJiUi9wQitDN2d5eTBlZz08L2RzOkRpZ2VzdFZhbHVlPjwvZHM6UmVmZXJlbmNlPjwvZHM6U2lnbmVkSW5mbz48ZHM6U2lnbmF0dXJlVmFsdWU-ZEZEMHVicXMxM21iVnoyYWlyU2dMTHc0TFA0TUltbTJxblRnNnpNd09tcVVTTU5OK201V2V2VFBMSGk0UWNlRXhiOGtxWCtaK3krVjVwMmNlSFg3bVpXWEtQWlk1cWRlQ3B1QWVjT2k2R0wxeGI0aG42OERyZ2RtOXJ2MHkrTjlsbTlLSXo1U1c2TmZxaitiOE9FZjFzVnlFLzhrcnVXZXAycWdhd0grdEFaVThZTWNHVGJkRnVFajBSZXpFOHNaUWdoRkQyQW8vSStIVlFEbU55MHNaN0ZqaVRWbEpJNDlnMlpYeFhmQ0JQS09aMi9pTXFCQjcrbWhORUtMN1pnaW84c2RZY2xKQy9BTE9GZG16OEY4c1hDOE4vNExid2YvVWhLVXg1RXQwU1d0SnJXdWFmQnUyN3V2dkwyV3M4anV3dys4SnVnYXNMZXk1VDJmVTdYbXBnPT08L2RzOlNpZ25hdHVyZVZhbHVlPjwvZHM6U2lnbmF0dXJlPjxzYW1sMjpTdWJqZWN0PjxzYW1sMjpOYW1lSUQgRm9ybWF0PVwidXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6dW5zcGVjaWZpZWRcIj50ZXN0dXNlcjwvc2FtbDI6TmFtZUlEPjxzYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD1cInVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpjbTpiZWFyZXJcIj48c2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgTm90T25PckFmdGVyPVwiMjAxNi0wOS0yOFQxNjowNDoyMC4yODBaXCIvPjwvc2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWwyOlN1YmplY3Q-PHNhbWwyOkNvbmRpdGlvbnMgTm90QmVmb3JlPVwiMjAxNi0wOS0yOFQxMTo1OToyMC4yODBaXCIgTm90T25PckFmdGVyPVwiMjAxNi0wOS0yOFQxNjowNDoyMC4yODBaXCIvPjxzYW1sMjpBdXRoblN0YXRlbWVudCBBdXRobkluc3RhbnQ9XCIyMDE2LTA5LTI4VDEyOjA0OjIwLjI4MFpcIiBTZXNzaW9uTm90T25PckFmdGVyPVwiMjAxNi0wOS0yOFQxMjowOToyMC4yODBaXCI-PHNhbWwyOkF1dGhuQ29udGV4dD48c2FtbDI6QXV0aG5Db250ZXh0Q2xhc3NSZWY-dXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmQ8L3NhbWwyOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDI6QXV0aG5Db250ZXh0Pjwvc2FtbDI6QXV0aG5TdGF0ZW1lbnQ-PC9zYW1sMjpBc3NlcnRpb24-IiwieHMudXNlci5hdHRyaWJ1dGVzIjp7fSwieHMuc3lzdGVtLmF0dHJpYnV0ZXMiOnsieHMuc2FtbC5ncm91cHMiOlsiYWxsYXV0aF9jb20tc2FwIl0sInhzLnJvbGVjb2xsZWN0aW9ucyI6WyJyY19qb3NoeV82IiwicmNfam9zaHlfNSIsIlRoaW5nX2FsbGF1dGhfc2FuZGJveF9jb20tc2FwIiwiYWxsYXV0aF9jb20tc2FwIl19LCJhdWQiOlsiZmlsZV9jaSIsImF1dGhfY2kuQ29uZmlndXJhdGlvbiIsInRlbmFudF9jaS50ZW5hbnQiLCJjb2xkc3RvcmVfY2kiLCJvcGVuaWQiLCJ0ZW5hbnRfY2kucGVycyIsImF1dGhfY2kub2dhIiwidGVuYW50X2NpLm9yZyIsImF1dGhfY2kiLCJ0ZW5hbnRfY2kiLCJ0aGluZ19jaSIsInNiLWlvdGFzX2NpIiwiY3RvZGF0YV9jaSIsImJwX2NpIiwiY29uZl9jaSIsInRoaW5nX2NpLkV2ZW50IiwidGRlX2NpIiwibG9jX2NpIiwiYnBfY2kuQ29uZmlndXJhdGlvbiIsImJwX2NpLnRlbmFudCIsInRoaW5nX2NpLkNvbmZpZ3VyYXRpb24iLCJ4c19hdXRob3JpemF0aW9uIiwiY3RfY2kiXX0.MecakSjkA7wlv4najSY7Xcrmt87BP8ksJbguXxj4GuinTY2kIu2KrPZEUSI0r9ujkBud3MLcthw3Q6R2F_-o1MGeS3gUUrgBnfv7TXZaW5OGT2Wcdt-kiR_jRAGnxw61VnqyMvGgBkIHnWKxM9tW85RmmhskdrKMEj-Iju1l6thtQRv2Rwfi-XII0_F6reUgz9UH9ZpOpwUOMkztxr_XQqhexggjUX5ZEcVmdCf5-tY7qSA_nSz9jgpkSNYHCddj0rIbLJgTo9PQ3X1Z75fJzRw8kQweX5C3kK1_T7wWKg4oMOnaFy-GxLoQAJnaJIkbgZJCgmVLsh_BW1cFBnsrKA"	
			},
			success: function(oEvent){
					for(var i=0; i<oEvent.length; i++){
						if(oEvent[i].isDirectory == true){
							var oTransNode = new sap.ui.commons.TreeNode({
								text:oEvent[i].name + "/", 
								icon:"images/folder.gif",
								hasExpander: true, 
								expanded: false,
								toggleOpenState: function(oEvent){
									that.getFiles(oEvent);
								}	
							});
						}
						else{
							var oTransNode = new sap.ui.commons.TreeNode({
								text:oEvent[i].name,
								icon:"images/file.jpg",
								expanded: false,
								selected: function(oEvent){
									that.handleSelected(oEvent);
								}});
						}
						oEventSource.addNode(oTransNode);
					}
				that.busyDialog.close();
			},
			error: function(oEvent){
				that.busyDialog.close();
				sap.ui.commons.MessageBox.show("Error occured in getting file", "ERROR")
			}
		});
	},
	
	getActualFilePath : function(oEventSource){
		var actualFilePath = "";
		var directories = [];
		for(var i=0; oEventSource.getParent().getText() != "com.sap.iotas.com-sap"; i++){
			directories[i] = oEventSource.getParent().getText();
			oEventSource = oEventSource.getParent();
		}
		for(var j=directories.length; j>0; j--){
			actualFilePath = actualFilePath + directories[j-1];
		}
		return actualFilePath;
	}
});