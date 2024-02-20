Feature: Gerenciar serviços

Scenario: Pré-condição - Serviço publicado
    Given que o anunciante esteja autenticado
    Given que o serviço esteja publicado

Scenario: Permitir editar o serviço    
    When o anunciante clicar em Editar o serviço X
    Then o serviço poderá ser visualizado.

Scenario: Permitir despublicar o serviço
    When o anunciante clicar em Editar o serviço Y
    When  o serviço poderá ser despublicado.
    Then o sistema deverá exibir uma mensagem de sucesso ao despublicar

Scenario: Permitir publicar o serviço
    When o anunciante clicar em Editar o serviço Z
    When  o serviço despublicado poderá ser publicado.
    Then o sistema deverá exibir uma mensagem de sucesso ao publicar