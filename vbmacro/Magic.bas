Attribute VB_Name = "Magic"
' source for image()
' http://www.commentcamarche.net/forum/affich-25360534-creer-macro-pour-redimensionner-images
' http://www.excel-pratique.com/fr/vba/boites_de_dialogue.php

Sub resizeImage()

    Dim resultat As String
     Dim taille As Double
     resultat = InputBox("de 0 à 3 avec 0 pour aucun bord et 3 pour une carte entière (3 par défaut)", "Bordure de l'image") 'La variable reçoit la valeur entrée dans l'InputBox
    Select Case resultat
        Case 0
            taille = 8.2
        Case 1
            taille = 8.4
        Case 2
            taille = 8.6
        Case 3
            taille = 8.8
        Case Else
            taille = 8.8
    End Select

    ' If resultat <> "" Then 'Si la valeur est différente de "" on affiche le résultat
        ' MsgBox resultat
 


    On Error Resume Next
    Selection.InlineShapes(1).ConvertToShape
    
    On Error GoTo erreur
    With Selection.ShapeRange
        .Height = CentimetersToPoints(taille)
        .WrapFormat.Type = wdWrapBehind
    End With
    
    Exit Sub
erreur:          MsgBox "la sélection ne contient pas d'image"

End Sub

Sub importDeck()
    ImportDeckForm.Show
End Sub

Sub openSearch()
    Dim resultat As String
    Dim url As String
    
    resultat = InputBox("Quelle carte chercher ?", "Recherche d'image")
    
    If resultat <> "" Then
        openBrowser (resultat)
    End If
    
End Sub

Sub openBrowser(cardName As String)
    url = "https://scryfall.com/search?order=name&as=grid&q=" & URLEncode(cardName)
    Shell ("C:\\Program Files\\Mozilla Firefox\\firefox.exe " + url)
End Sub

Public Function URLEncode( _
   StringVal As String, _
   Optional SpaceAsPlus As Boolean = False _
) As String

  Dim StringLen As Long: StringLen = Len(StringVal)

  If StringLen > 0 Then
    ReDim Result(StringLen) As String
    Dim i As Long, CharCode As Integer
    Dim Char As String, Space As String

    If SpaceAsPlus Then Space = "+" Else Space = "%20"

    For i = 1 To StringLen
      Char = Mid$(StringVal, i, 1)
      CharCode = Asc(Char)
      Select Case CharCode
        Case 97 To 122, 65 To 90, 48 To 57, 45, 46, 95, 126
          Result(i) = Char
        Case 32
          Result(i) = Space
        Case 0 To 15
          Result(i) = "%0" & Hex(CharCode)
        Case Else
          Result(i) = "%" & Hex(CharCode)
      End Select
    Next i
    URLEncode = Join(Result, "")
  End If
End Function


