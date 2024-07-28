CREATE TABLE IF NOT EXISTS composicao_de_pendencia
(
    valor           double       null,
    data            datetime(6)  null,
    id              bigint auto_increment primary key,
    aging           varchar(30)  null,
    area_resposavel varchar(30)  null,
    descricao       varchar(255) null,
    observacoes     varchar(255) null
);

CREATE TABLE IF NOT EXISTS empresa
(
    id           bigint auto_increment primary key,
    nome_empresa varchar(50)  null,
    cnpj         varchar(255) null,
    email        varchar(255) null
);

CREATE TABLE IF NOT EXISTS balancete
(
    ano             int                       not null,
    numero_conta    int                       not null,
    status          tinyint                   null,
    tipo            tinyint                   null,
    total_balancete double                    not null,
    empresa_id      bigint                    null,
    id              bigint auto_increment primary key,
    mes             varchar(30)               null,
    nome_conta      varchar(30)               null,
    classificacao   enum ('ATIVO', 'PASSIVO') null,
    constraint FKpvypfynlsmd58ni43yxi8euoe foreign key (empresa_id) references empresa (id),
    check (`status` between 0 and 3),
    check (`tipo` between 0 and 2)
);

CREATE TABLE IF NOT EXISTS controle
(
    aging_listada_pendencia  bit          null,
    circulante               tinyint      null,
    composicao_preenchida    bit          null,
    data_competencia         date         null,
    double_saldo_analise     double       not null,
    double_saldo_balancete   double       not null,
    double_valor_diferenca   double       not null,
    empresa_id               bigint       null,
    id                       bigint auto_increment primary key,
    nome_conta               varchar(30)  null,
    nome_responsavel         varchar(255) null,
    observacoes              varchar(255) null,
    status_geral_conciliacao varchar(255) null,
    sub_grupo                varchar(255) null,
    constraint FKb3orbktjgweqn4g1eq2d0ha69 foreign key (empresa_id) references empresa (id),
    check (`circulante` between 0 and 1)
);

CREATE TABLE IF NOT EXISTS empresa_group
(
    id bigint auto_increment primary key
);

CREATE TABLE IF NOT EXISTS empresa_group_empresas
(
    empresa_group_id bigint not null,
    empresas_id      bigint not null,
    constraint UK_nct964vylm45llnnsf0nnasrw unique (empresas_id),
    constraint FK3q8j80mwu2plc6x5f3tlhb0r1 foreign key (empresas_id) references empresa (id),
    constraint FKb9h1voat5y1o6m16ybh4uyk0r foreign key (empresa_group_id) references empresa_group (id)
);

CREATE TABLE IF NOT EXISTS responsavel
(
    empresa_id bigint      null,
    id         bigint auto_increment primary key,
    email      varchar(50) not null,
    nome       varchar(50) not null,
    constraint FK7d11y6qk5a3r0xujbpjsjm9ht foreign key (empresa_id) references empresa (id)
);

CREATE TABLE IF NOT EXISTS application_user
(
    empresa_group_id bigint       null,
    id               bigint auto_increment primary key,
    responsavel_id   bigint       null,
    username         varchar(15)  null,
    name             varchar(50)  null,
    password         varchar(150) null,
    profile_picture  mediumblob   null,
    constraint UK_25wufxm7c933su7cm1058gcno unique (responsavel_id),
    constraint UK_6c0v0rco93sykgyetukfmkkod unique (username),
    constraint FKivey8kbym137qrd26n076kpma foreign key (responsavel_id) references responsavel (id),
    constraint FKoybj11wj6ar1m0j0jvqprt423 foreign key (empresa_group_id) references empresa_group (id)
);

CREATE TABLE IF NOT EXISTS application_user_roles
(
    application_user_id bigint                                not null,
    roles               enum ('USER', 'ADMIN', 'SUPER_ADMIN') null,
    constraint FK9hwva08h4u671cqxpexx1dx7i foreign key (application_user_id) references application_user (id)
);

CREATE TABLE IF NOT EXISTS composicao_lancamentos_contabeis
(
    credito         double       NOT NULL,
    csrf            double       NOT NULL,
    data_vencimento date         NULL,
    debito          double       NOT NULL,
    dias_vencidos   int          NOT NULL,
    inss            double       NOT NULL,
    irrf            double       NOT NULL,
    iss             double       NOT NULL,
    num_nota_fiscal int          NOT NULL,
    balancete_id    bigint       NULL,
    responsavel_id  bigint       NULL,
    id              binary(16)   NOT NULL PRIMARY KEY,
    historico       varchar(255) NULL,
    constraint FK15s8o2lnvo5lwb3bk2s6fcemc foreign key (responsavel_id) references responsavel (id),
    constraint FK2hdgnger9wgqcmw2mwmb7d8cp foreign key (balancete_id) references balancete (id)
);

CREATE TABLE IF NOT EXISTS file_upload
(
    created_time                        datetime(6) null,
    id                                  bigint auto_increment primary key,
    ext                                 varchar(10) null,
    composicao_lancamentos_contabeis_id binary(16)  null,
    name                                varchar(50) null,
    constraint FKillj44s5osm1w8oud3d1ru735
        foreign key (composicao_lancamentos_contabeis_id) references composicao_lancamentos_contabeis (id)
);
