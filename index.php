<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/login.css">
    
    <!-- <script defer src="./js/login.js"></script> -->
    
    <title>Tela Inicial</title>
    </head>
<body>
<form class="login-form" method="get" action="./php/game.php">

<div class="login_header">
    <img src="./images/logo-removebg-preview.png" alt="brain icon">
    <h1>Fun Memory</h1>
</div>

<input type="text" placeholder="Name" class="login__input" name="login__input" required>
<button type="submit" class="login__button">Play</button>



</form>


<?php
if (isset($_GET['login__input'])){
    $nome = $_GET['login__input'];
    include_once("conexao.php");
    $sql = "insert into players(nome) values ('$nome');";
    // echo $sql;
    if(mysqli_query($conexao,$sql)){
        setcookie('player',$nome);
        header("location: php/game.php");
    }else{
        echo "Erro";
    }
    mysqli_Close($conexao);
}

?>
</body>
</html>

