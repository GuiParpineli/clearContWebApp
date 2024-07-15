package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.helpers.createTitle
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.models.enums.Role
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.*
import br.com.clearcont.clearcontwebapp.shared.COMPANY_GROUP_ID
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.Component
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.formlayout.FormLayout
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.select.Select
import com.vaadin.flow.component.textfield.EmailField
import com.vaadin.flow.component.textfield.PasswordField
import com.vaadin.flow.component.textfield.TextField
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.RolesAllowed
import org.vaadin.crudui.crud.CrudOperation
import org.vaadin.crudui.crud.impl.GridCrud
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory
import org.vaadin.crudui.layout.impl.HorizontalSplitCrudLayout
import java.util.logging.Logger

@Route(value = "admin", layout = MainLayout::class)
@PageTitle("ADMIN PANEL")
@RolesAllowed("SUPER_ADMIN")
class AdminPanelView(
    private val userService: UserAppService,
    private val responsavelRepository: ResponsavelRepository,
    private val empresaGroupService: EmpresaGroupService,
    private val composicaoLancamentosContabeisService: ComposicaoLancamentosContabeisService,
    private val empresaService: EmpresaService,
    private val balanceteService: BalanceteService
) : Div(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    val log: Logger = Logger.getLogger(javaClass.name)

    private val addUserForm: FormLayout by lazy { setupAddUserForm() }
    private val removeUserForm: GridCrud<ApplicationUser> by lazy { setupRemoveUpdateUserForm() }
    private val setupCompany: GridCrud<Empresa> by lazy { setupEmpresa() }
    private val setupConciliar: GridCrud<ComposicaoLancamentosContabeis> by lazy { setupConciliarForm() }

    init {
        val title = createTitle("Admin Panel").apply { width = "50%" }

        val addCard = Button("Adicionar Usuário").apply { addClickListener { showForm(addUserForm) } }

        val removeCard = Button("Remover Usuário / Atualizar Usuário ").apply {
            addClickListener { showForm(removeUserForm) }
        }
        val empresaCard = Button("Adicionar Empresa").apply {
            addClickListener { showForm(setupCompany) }
        }

        val conciliationCard = Button("Gerenciar Conciliações").apply {
            addClickListener { showForm(setupConciliar) }
        }

        val cardLayout = HorizontalLayout(addCard, removeCard, empresaCard)

        this.add(
            VerticalLayout(title, cardLayout, addUserForm, removeUserForm, conciliationCard).apply {
                justifyContentMode = FlexComponent.JustifyContentMode.CENTER
            })
    }

    private fun showForm(component: Component) {
        addUserForm.isVisible = false
        removeUserForm.isVisible = false
        setupCompany.isVisible = false
        component.isVisible = true
        log.info("Showing form")
    }

    private fun setupConciliarForm(): GridCrud<ComposicaoLancamentosContabeis> {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val empresaGroupID = cookieFactory.getCookieInteger(COMPANY_GROUP_ID)
        val formFactory = DefaultCrudFormFactory(ComposicaoLancamentosContabeis::class.java).apply {
            setVisibleProperties("status")
        }
        val crud = GridCrud(ComposicaoLancamentosContabeis::class.java).apply {
            crudFormFactory = formFactory
            grid.setColumns("status", "balancete.nomeConta", "balancete.ano", "balancete.mes")
            setFindAllOperation { composicaoLancamentosContabeisService.findAllStatusReopen(empresaGroupID) }
            setUpdateOperation {
                it.balancete!!.status = it.status!!
                balanceteService.update(it.balancete!!)
                composicaoLancamentosContabeisService.update(it)
            }
        }
        add(crud)
        return crud
    }

    private fun setupEmpresa(): GridCrud<Empresa> {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val empresaGroupID = cookieFactory.getCookieInteger(COMPANY_GROUP_ID)

        val formFactory = DefaultCrudFormFactory(Empresa::class.java)
        formFactory.setVisibleProperties("nomeEmpresa", "cnpj", "email")
        val empresaGroup: EmpresaGroup? = empresaGroupService.getByID(empresaGroupID)
        val userCrud: GridCrud<Empresa> = GridCrud(Empresa::class.java, HorizontalSplitCrudLayout()).apply {
            crudFormFactory = formFactory
            grid.setColumns("nomeEmpresa", "cnpj", "email")

            setFindAllOperation { empresaService.getAll() }
            setAddOperation {
                empresaService.save(it)
                empresaGroup?.addEmpresa(it)
                if (empresaGroup != null) {
                    empresaGroupService.update(empresaGroup)
                }
                log.info("Empresa adicionada com sucesso, EMPRESA GROUP: $empresaGroup")
                return@setAddOperation it
            }
            setUpdateOperation { empresaService.update(it) }
            setDeleteOperation { empresaService.delete(it) }
        }

        add(userCrud)
        userCrud.isVisible = false
        return userCrud
    }

    private fun setupRemoveUpdateUserForm(): GridCrud<ApplicationUser> {
        val formFactory = DefaultCrudFormFactory(ApplicationUser::class.java)
        formFactory.setVisibleProperties("username", "name", "roles")

        val userCrud: GridCrud<ApplicationUser> =
            GridCrud(ApplicationUser::class.java, HorizontalSplitCrudLayout()).apply {
                crudFormFactory = formFactory
                grid.setColumns("username", "name", "roles")

                setFindAllOperation { userService.getAll().filter { !(it.roles.contains(Role.ADMIN)) } }
                setAddOperationVisible(false)
                setUpdateOperation { userService.update(it) }
                setDeleteOperation { userService.delete(it) }

                crudFormFactory.setVisibleProperties(CrudOperation.ADD, "username", "name", "password", "roles")
                crudFormFactory.setVisibleProperties(CrudOperation.UPDATE, "name", "password", "roles")
                crudFormFactory.setVisibleProperties(CrudOperation.DELETE, "username", "name")

                crudFormFactory.setFieldProvider("password") { PasswordField() }
                crudFormFactory.setFieldProvider("roles") { Select<Role>().apply { setItems(Role.entries) } }
            }

        add(userCrud)
        userCrud.isVisible = false
        return userCrud
    }

    private fun setupAddUserForm(): FormLayout {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val userForm = FormLayout()
        val id = cookieFactory.getCookieInteger(COMPANY_GROUP_ID)

        val usernameField = TextField("Username")
        val nameField = TextField("Name")
        val passwordField = PasswordField("Password")
        val rolesField = Select<Role>().apply {
            label = "Roles"
            setItems(Role.entries.filter { it != Role.SUPER_ADMIN })
            setItemLabelGenerator { it.roleName }
        }
        val empresaGroup = empresaGroupService.getByID(id)
        val empresaPicker = Select<Empresa>().apply {
            label = "Empresa"
            setItems(empresaGroup?.empresas)
            setItemLabelGenerator { it.nomeEmpresa.toString() }
        }
        val email = EmailField("Email")

        val saveButton = Button("Save").apply {
            addClickListener {
                val user = ApplicationUser(
                    username = usernameField.value,
                    name = nameField.value,
                    password = passwordField.value,
                    roles = mutableSetOf(rolesField.value),
                    profilePicture = null,
                    empresaGroup = empresaGroup!!,
                    responsavel = null
                )
                userService.save(user)
                responsavelRepository.save(Responsavel(email.value, user, empresaPicker.value))
                Notification.show("Usuario salvo com sucesso!")

                cleanInputs(usernameField, nameField, passwordField, rolesField, empresaPicker, email)
            }
            style.setBackgroundColor("green").setColor("white")
        }

        val horizontalLayout = HorizontalLayout(saveButton).apply {
            justifyContentMode = FlexComponent.JustifyContentMode.END
        }

        userForm.add(
            usernameField,
            nameField,
            passwordField,
            rolesField,
            empresaPicker,
            email,
            horizontalLayout
        )

        userForm.isVisible = false

        return userForm
    }

    private fun cleanInputs(
        usernameField: TextField,
        nameField: TextField,
        passwordField: PasswordField,
        rolesField: Select<Role>,
        empresaPicker: Select<Empresa>,
        email: EmailField
    ) {
        usernameField.clear()
        nameField.clear()
        passwordField.clear()
        rolesField.clear()
        empresaPicker.clear()
        email.clear()
    }

//    private fun setupComposicaoForm(): FormLayout {
//        val composicaoForm = FormLayout()
//
//        val dataField = DatePicker("Data")
//        val historicoField = TextField("Historico")
//        val debitoField = NumberField("Debito")
//        val creditoField = NumberField("Credito")
//        val saldoContabilField = NumberField("Saldo Contabil")
//        val statusField = Select<StatusConciliacao>().apply {
//            label = "Status"
//            setItems(StatusConciliacao.entries)
//        }
//
//        val saveButton = Button("Save").apply {
//            addClickListener {
//                val composicao = ComposicaoLancamentosContabeis(
//                    data = dataField.value,
//                    historico = historicoField.value,
//                    debito = debitoField.value,
//                    credito = creditoField.value,
//                    doubleSaldoContabil = saldoContabilField.value,
//                    balancete = null,
//                    responsavel = Responsavel(),
//                    composicaoLancamentosContabeisFull = ComposicaoLancamentosContabeis()
//                )
//                composicaoService.save(composicao)
//            }
//        }
//
//        composicaoForm.add(
//            dataField,
//            historicoField,
//            debitoField,
//            creditoField,
//            saldoContabilField,
//            statusField,
//            saveButton
//        )
//
//        return composicaoForm
//    }
}
