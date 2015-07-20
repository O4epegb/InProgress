<?php

$recepient = "o4epegb@mail.ru";
$sitename = "Golden";

$name = trim($_GET["name"]);
$email = trim($_GET["phone"]);
$subject = trim($_GET["subject"]);
$text = trim($_GET["text"]);

$pagetitle = "New message from \"$sitename\"";
$message = "Name: $name \nEmail: $email \nSubject: $subject \nText: $text";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");