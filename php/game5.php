<?php
//Repetir em todas as páginas
    if(isset($_COOKIE['player'])){
        $nome = $_COOKIE['player'];
    }else{
        header("location:../index.php");
    }
?>

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
<style>
    .adj{
        margin-top: 10px;
        padding: 10px;
        cursor: pointer;
    }

</style>
<body>
    <?php
        include_once("navbar.html");
    ?>
    <main>
    <div id="popup" class="popup">
    <div class="popup-content">
        <span id="closePopup" class="close">&times;</span>
        <h3>Parabéns!</h3><br>
        <p id="popupMessage"></p>
        <button id="play-again" class="button-53 adj">Jogar Novamente</button>
    </div>
    </div>
    <header>
            <span class="player"></span>
            <span>
                Player: <span class="user"><?php echo $nome;?></span>
                Time: <span class="timer">00</span>
            </span>
        </header>

         <div class="grid"></div>
    </main>
   

    <audio id="audioBicho" src="" style="display:none;"></audio>
</body>
</html>