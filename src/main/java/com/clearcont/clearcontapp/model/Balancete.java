package com.clearcont.clearcontapp.model;

import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Balancete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @Setter
    private Empresa empresa;
    @Setter
    private String nomeConta;
    @Setter
    private Integer numeroConta;
    private Double totalBalancete;
    @Setter
    private String classificacao;
    @Setter
    private String mes;
    @Setter
    private Integer ano;

    @OneToMany(mappedBy = "balancete", cascade = CascadeType.ALL, orphanRemoval = true)
    private @NotNull List<ComposicaoLancamentosContabeis> composicaoLancamentosContabeisList = new ArrayList<>();

    public void addComposicaoLancamentosContabeis(@NotNull ComposicaoLancamentosContabeis composicaoLancamentosContabeis) {
        this.composicaoLancamentosContabeisList.add(composicaoLancamentosContabeis);
        composicaoLancamentosContabeis.setBalancete(this);
    }

    public void removeComposicaoLancamentosContabeis(@NotNull ComposicaoLancamentosContabeis composicaoLancamentosContabeis) {
        this.composicaoLancamentosContabeisList.remove(composicaoLancamentosContabeis);
        composicaoLancamentosContabeis.setBalancete(null);
    }

    @Override
    public @NotNull String toString() {
        return "Balancete{" + "id=" + id + ", empresa=" + empresa + ", nomeConta='" + nomeConta + '\'' + ", numeroConta=" + numeroConta + ", totalBalancete=" + totalBalancete + ", classificacao='" + classificacao + '\'' + ", mes='" + mes + '\'' + ", ano=" + ano + '}';
    }

    public int contarPontos(@NotNull String texto) {
        int contador = 0;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == '.') {
                contador++;
            }
        }
        return contador;
    }

    public void setTotalBalancete(@NotNull String totalBalancete) {
        if (contarPontos(totalBalancete) < 1) this.totalBalancete = Double.valueOf(totalBalancete.replace(",", "."));
        else this.totalBalancete = Double.valueOf(totalBalancete.replaceFirst("\\.", "").replaceFirst(",", "."));
    }

    public @NotNull String getTotalBalancete() {
        return DecimalFormatBR.getDecimalFormat().format(totalBalancete);
    }

    public Double getDoubleTotalBalancete() {
        return totalBalancete;
    }

    @Override
    public final boolean equals(@Nullable Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Balancete balancete = (Balancete) o;
        return getId() != null && Objects.equals(getId(), balancete.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}