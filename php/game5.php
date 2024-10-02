<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/game.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script defer src="../js/game5.js"></script>
    <script defer src="../js/menu.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"></script>
    
    <title>Fun Memory</title>
</head>
<body>
    <?php
        include_once("navbar.html");
    ?>
    <main>
        <header>
            <span class="player"></span>
            <span>Time: <span class="timer">00</span></span>
        </header>
         <div class="grid"></div>
    </main>

    <audio id="audioBicho" src="" style="display:none;"></audio>

</body>
</html>