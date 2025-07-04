package br.com.clearcont.clearcontwebapp.config.exception

import java.io.Serializable

data class StandartError(
    val code: Int,
    val error: String,
    val message: String
) : Serializable
