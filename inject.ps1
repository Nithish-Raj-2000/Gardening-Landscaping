$files = Get-ChildItem -Path "D:\Stackly Projects\Gardening & Landscaping" -Filter "*.html"
foreach ($f in $files) {
  $c = Get-Content $f.FullName -Raw
  $updated = $c -replace '(?m)^\s*<script src="assets/js/nav-redirect\.js"></script>\r?\n', ''
  if ($updated -notmatch "hover.css") {
    $updated = $updated -replace "</head>", "  <link rel=`"stylesheet`" href=`"assets/css/hover.css`">`n</head>"
  }
  if ($updated -ne $c) {
    Set-Content -Path $f.FullName -Value $updated -NoNewline
  }
}
