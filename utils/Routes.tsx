export enum ROUTE {
  HOME = '/',
  UPCOMING = '/wykopalisko',
  HITS = '/hity',
  MIKROBLOG = '/mikroblog',
  MY_WYKOP = '/moj',
  ANY = '*',
  LINK = '/link/:id',
  ENTRY = '/wpis/:id',
}

// const ROUTES: Record<string, Page> = {
//   MAIN_PAGE: {
//     label: "Strona Główna",
//     path: "/",
//   },
//   ABOUT_US: {
//     label: "O Nas",
//     path: "/o-nas",
//   },
//   OFFER: {
//     label: "Oferta",
//     path: "/oferta"
//   },
//   CONTACT: {
//     label: "Kontakt",
//     path: "/kontakt",
//   },
// };

// export const routes = (
//   <RouterRoutes>
//     <Route path={ROUTE.HITS} element={<Hits />}>
//       {Object.values(HitsPeriod).map((period) => (
//         <Route path={period} key={period} element={<Hits period={period} />} />
//       ))}
//     </Route>
//     <Route path={ROUTE.MIKROBLOG} element={<Mikroblog />}>
//       {Object.values(MikroblogCategory).map((category) => (
//         <Route path={category} key={category} element={<Mikroblog category={category} />} />
//       ))}
//     </Route>
//     <Route path={ROUTE.LINK} element={<Link />} />
//     <Route path={ROUTE.ENTRY} element={<Entry />} />
//     <Route path={ROUTE.MAIN} element={<Main />} />
//     <Route path={ROUTE.ANY} element={<Navigate to='/' />} />
//   </RouterRoutes>
// );
