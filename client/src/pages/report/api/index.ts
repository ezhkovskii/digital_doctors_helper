import { IReport } from 'shared/index';
const getReport: (reportId: string) => Promise<IReport> = (
   reportId: string
) => {
   return new Promise((resolve) => {
      const reports = JSON.parse(localStorage.getItem('reports'));
      for (let index = 0; index < reports.length; index++) {
         const report = reports[index];
         if (report.reportId == reportId) {
            resolve({
               reportId: report.reportId,
               name: report.name,
               patientsCount: {
                  all: {
                     male: 56,
                     female: 100
                  },
                  cardio: {
                     male: 36,
                     female: 342
                  },
                  neurology: {
                     male: 234,
                     female: 32
                  },
                  otolaryngology: {
                     male: 123,
                     female: 32
                  }
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
                  cardio: [
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
                  neurology: [
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
                  otolaryngology: [
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
                  cardio: 50,
                  neurology: 100,
                  otolaryngology: 70
               },
               doctors: [
                  {
                     id: 1,
                     name: 'Пупкин Вася Олегович',
                     direction: 'cardio',
                     percent: 69,
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
                     direction: 'neurology',
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
                     id: 3,
                     name: 'Морозов Дмитрий Константинович',
                     percent: 10,
                     direction: 'otolaryngology',
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
                     id: 4,
                     name: 'Абрамова Яна Мирославовна',
                     percent: 100,
                     direction: 'cardio',
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
                  }
               ]
            });
            break;
         }
      }
   });
};

export { getReport };
