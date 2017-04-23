import alertService from '../../services/alert-service';
import positionService from '../../services/position-service';

export default {
    created() {
        this.reloadData();
    },
    data() {
        return {
            isToShowEditPosition: false,
            position: {
                id: 0,
                full_name: '',
                short_name: '',
            },
            positions: [],
            columns: ['full_name', 'short_name', 'options'],
            optionsTable: {
                perPage: 50,
                filterable: false,
                sortable: ['full_name', 'short_name'],
                headings: {
                    full_name: 'Nome',
                    short_name: 'Nome abreviado',
                    options: 'Opções'
                }
            }
        }
    },
    methods: {
        cancel() {
            alertService.confirm('Deseja mesmo cancelar as alterações feitas?').then(ok => {
                if (ok) {
                    this.isToShowEditPosition = false;
                }
            });
        },
        clearPosition() {
            this.position.id = 0;
            this.position.full_name = '';
            this.position.short_name = '';
        },
        deletePosition(id) {

        },
        editPosition(id) {
            this.clearPosition();
            this.isToShowEditPosition = true;
            positionService.get(id).then(position => this.position = position);
        },
        newPosition() {
            this.clearPosition();
            this.isToShowEditPosition = true;
        },
        reloadData() {
            positionService.getAll(true).then(positions => {
                this.positions = positions;
            });
        },
        save() {
            if (!this.position.full_name || this.position.full_name.trim() == '') {
                alertService.alert('Por favor, preencha o nome da posição!');
                return;
            }

            if (!this.position.short_name || this.position.short_name.trim() == '') {
                this.position.short_name = this.position.full_name;
            }

            positionService.save(this.position).then(() => {
                this.isToShowEditPosition = false;
                this.reloadData();
            });
        }
    }
}