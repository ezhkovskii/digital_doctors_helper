import { IReport } from 'shared/index';
const getReport: (reportId: string) => Promise<IReport> = (
   reportId: string
) => {
   return new Promise((resolve) => {
      const reports = JSON.parse(localStorage.getItem('reports'));
      for (let index = 0; index < reports.length; index++) {
         const report = reports[index];
         let res = {} as IReport;
         if (report.reportId == reportId) {
            res = {
               reportId: report.reportId,
               name: report.name,
               positions: {
                  position_1: 'Врач кардиолог',
                  position_2: 'Врач невролог',
                  position_3: 'Врач какой-то'
               },
               reportsTypeCount: {
                  all: [
                     {
                        name: 'Обязательные',
                        count: 2500
                     },
                     {
                        name: 'Не обязательные',
                        count: 347
                     },
                     {
                        name: 'Дополнительные',
                        count: 137
                     }
                  ],
                  position_1: [
                     {
                        name: 'Обязательные',
                        count: 100
                     },
                     {
                        name: 'Не обязательные',
                        count: 150
                     },
                     {
                        name: 'Дополнительные',
                        count: 13
                     }
                  ],
                  position_2: [
                     {
                        name: 'Обязательные',
                        count: 500
                     },
                     {
                        name: 'Не обязательные',
                        count: 13
                     },
                     {
                        name: 'Дополнительные',
                        count: 250
                     }
                  ],
                  position_3: [
                     {
                        name: 'Обязательные',
                        count: 1337
                     },
                     {
                        name: 'Не обязательные',
                        count: 4
                     },
                     {
                        name: 'Дополнительные',
                        count: 500
                     }
                  ]
               },
               percentByDepartment: {
                  position_1: 50,
                  position_2: 100,
                  position_3: 70
               },
               doctors: [
                  {
                     id: 1,
                     name: 'Пупкин Вася Олегович',
                     position: 'position_1',
                     percent: 69,
                     reportsTypeCount: [
                        {
                           name: 'Обязательные',
                           count: 100
                        },
                        {
                           name: 'Не обязательные',
                           count: 150
                        },
                        {
                           name: 'Дополнительные',
                           count: 13
                        }
                     ],
                     patients: [
                        {
                           id: 2,
                           date: new Date(),
                           percent: 86,
                           name: 'Жымоло Евгений Петрович',
                           diagnosis: 'Что то с животом',
                           direction: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: true
                              }
                           ],
                           requiredByDiagnosis: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: true
                              }
                           ]
                        }
                     ]
                  },
                  {
                     id: 2,
                     name: 'Устинов Дмитрий Семёнович',
                     percent: 30,
                     position: 'position_2',
                     reportsTypeCount: [
                        {
                           name: 'Обязательные',
                           count: 100
                        },
                        {
                           name: 'Не обязательные',
                           count: 150
                        },
                        {
                           name: 'Дополнительные',
                           count: 13
                        }
                     ],
                     patients: [
                        {
                           id: 3,
                           name: 'Головин Артём Иванович',
                           date: new Date(),
                           percent: 80,
                           diagnosis: 'Что то с почками',
                           direction: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: false,
                                 isAdditional: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: false,
                                 isAdditional: true
                              }
                           ],
                           requiredByDiagnosis: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: true
                              }
                           ]
                        }
                     ]
                  },
                  {
                     id: 3,
                     name: 'Морозов Дмитрий Константинович',
                     percent: 10,
                     position: 'position_3',
                     reportsTypeCount: [
                        {
                           name: 'Обязательные',
                           count: 100
                        },
                        {
                           name: 'Не обязательные',
                           count: 150
                        },
                        {
                           name: 'Дополнительные',
                           count: 13
                        }
                     ],
                     patients: [
                        {
                           id: 4,
                           name: 'Кузина Ксения Михайловна',
                           date: new Date(),
                           percent: 10,
                           diagnosis: 'Что то с почками',
                           direction: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: false,
                                 isAdditional: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: false,
                                 isAdditional: true
                              }
                           ],
                           requiredByDiagnosis: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: true
                              }
                           ]
                        }
                     ]
                  },
                  {
                     id: 4,
                     name: 'Абрамова Яна Мирославовна',
                     percent: 100,
                     position: 'position_3',
                     reportsTypeCount: [
                        {
                           name: 'Обязательные',
                           count: 100
                        },
                        {
                           name: 'Не обязательные',
                           count: 150
                        },
                        {
                           name: 'Дополнительные',
                           count: 13
                        }
                     ],
                     patients: [
                        {
                           id: 5,
                           name: 'Куликова Алина Павловна',
                           diagnosis: 'Что то с носками',
                           date: new Date(),
                           percent: 10,
                           direction: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: false,
                                 isAdditional: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: false,
                                 isAdditional: true
                              }
                           ],
                           requiredByDiagnosis: [
                              {
                                 name: 'Какое-то направление',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 2',
                                 isRequired: true
                              },
                              {
                                 name: 'Какое-то направление 3',
                                 isRequired: true
                              }
                           ]
                        }
                     ]
                  }
               ]
            };
            break;
         }
         resolve(res);
      }
   });
};

export { getReport };
