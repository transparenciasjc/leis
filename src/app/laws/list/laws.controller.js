(function() {
    'use strict';

    angular.module('lawsApp')
        .controller('LawsCtrl', function($scope, $http, $stateParams, URI, TOTAL_ITENS) {

            $scope.totalPorPg = 10;
            $scope.pgAtual = 1;
            $scope.direction = 'desc';
            $scope.filtro = {situacao:{}, classe:{}, tipo:{}, ano:null};

            preecheForm();
            getLaws();

            function preecheForm() {

              $http.get(URI + 'leis/anos')
                      .success(function(data) {
                          $scope.anos = data;
                      })
                      .error(function(error) {
                          console.log(error);
              });

              $http.get(URI + 'tipo')
                      .success(function(data) {
                          $scope.tipos = data;
                      })
                      .error(function(error) {
                          console.log(error);
              });

              $http.get(URI + 'situacao-simplificada')
                      .success(function(data) {
                          $scope.situacoes = data;
                      })
                      .error(function(error) {
                          console.log(error);
              });

              $http.get(URI + 'classe')
                      .success(function(data) {
                          $scope.classes = data;
                      })
                      .error(function(error) {
                          console.log(error);
              });

            };

            function getLaws() {

              var URL = URI + 'leis/filtra?total='+ $scope.totalPorPg + '&pg=' + ($scope.pgAtual - 1);

              URL = (typeof $scope.filtro.situacao.id === 'undefined' || !$scope.filtro.situacao.id) ? URL : URL + '&idSituacao=' + $scope.filtro.situacao.id;
              URL = (typeof $scope.filtro.classe.id === 'undefined' || !$scope.filtro.classe.id) ?  URL : URL + '&idClasse=' + $scope.filtro.classe.id;
              URL = (typeof $scope.filtro.tipo.id === 'undefined' || !$scope.filtro.tipo.id) ? URL :  URL + '&idTipo=' + $scope.filtro.tipo.id;
              URL = (typeof $scope.filtro.ano === 'undefined' || !$scope.filtro.ano) ?  URL : URL + '&ano=' + $scope.filtro.ano.ano;

              $http.get(URL)
                      .success(function(data, status, headers) {
                          $scope.laws = data;
                          $scope.totalItens = headers(TOTAL_ITENS);
                          $scope.lawOrder = 'id';
                      })
                      .error(function(error, status, headers) {
                          console.log(error);
              });
            }

            $scope.filtrar = function() {
              getLaws();
            };

            $scope.limpar = function() {
              $scope.filtro = {situacao:{}, classe:{}, tipo:{}, ano:null};
              getLaws();
            };

            $scope.pageChanged = function() {
              getLaws();
            };

        });
})();
