
const dayStyle = {
     width: '100px',
};
const dateStyle = {
     width: '100px',
};
const timeStyle = {
     width: '70px',
};
const whatStyle = {
     width: 'auto',
     minWidth: '200px',
};
const whereStyle = {
     width: '250px',
};


export default function TableHead() {
     return (
          <thead>
               <tr>
                    <th style={dayStyle}>Day</th>
                    <th style={dateStyle}>Date</th>
                    <th style={timeStyle}>Time</th>
                    <th style={whatStyle}>What</th>
                    <th style={whereStyle}>Where</th>
               </tr>
          </thead>
     );
}
