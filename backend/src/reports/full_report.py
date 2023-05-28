from typing import Any

from reports.models import Report, Analysis


def get_full_report(report: Report) -> dict[str, Any]:
    data = {
        "file": report.file,
        "name": report.name
    }

    analysis_set = Analysis.objects.select_related("report", "file_data").filter(report__id=report.id)

    doctor_positions = analysis_set.values("file_data__doctor_position").distinct()
    data["positions"] = {f"position_{ind}": position_name for ind, position_name in enumerate(doctor_positions)}

    doctors = analysis_set.values(
        "file_data__doctor_position", "file_data__doctor_external_id", "file_data__doctor_name"
    ).distinct()
    doctors_for_data = []
    for doctor in doctors:
        doctors_for_data.append({
            "id": doctor["file_data__doctor_external_id"],
            "name": doctor["file_data__doctor_name"],
            "position": doctor["file_data__doctor_position"]
        })

    for doctor in doctors_for_data:
        analysis_set.filter(file_data__doctor_external_id=doctor["id"])

    # Не успели сделать вывод отчета на фронт!!!!

    return analysis_set[0].data