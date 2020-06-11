VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} ImportDeckForm 
   Caption         =   "Import"
   ClientHeight    =   7755
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   6075
   OleObjectBlob   =   "ImportDeckForm.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "ImportDeckForm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False


Private Sub CommandButtonCancel_Click()
    Unload Me
End Sub

Private Sub CommandButtonOk_Click()
    Set regexpDigit = CreateObject("vbscript.regexp")
    regexpDigit.Global = True
    regexpDigit.Pattern = "\d+ "
    
    Set regexpEdition = CreateObject("vbscript.regexp")
    regexpEdition.Global = True
    regexpEdition.IgnoreCase = True
    regexpEdition.Pattern = "\[.+] | \(.+\)"
    
    Set regexpComment = CreateObject("vbscript.regexp")
    regexpComment.Global = True
    regexpComment.Pattern = "\/\/.*"
    
    Dim sep As String
    Dim lines As Variant
    Dim cardName As String
    
    lines = Split(txtDeck.Text, vbCrLf)
    Dim index As Integer
    For index = LBound(lines) To UBound(lines)
        cardName = regexpDigit.Replace(lines(index), "")
        cardName = regexpEdition.Replace(cardName, "")
        cardName = regexpComment.Replace(cardName, "")
        If cardName <> "" Then
            Magic.openBrowser (cardName)
        End If
        
        
    Next
End Sub
